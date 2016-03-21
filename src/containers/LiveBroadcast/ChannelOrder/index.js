/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox2, DataGrid, KpiGroup } from '../../../components'
import style from '../../style.scss'
import { getOrderOption } from '../../../tools/service'
import { REST_API_BASE_URL, theme } from '../../../config'
import _ from 'lodash'

const kpis = [
//  {value:'channelName', label: '频道名称', unit: ''},
//  {value:'uid', label: '排名', unit: ''},
  {value:'userIndex', label: '用户指数', unit: ''},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
  {value:'marketRatio', label: '市占率', unit: '%'},
  {value:'useTimeAVG', label: '户均使用时长', unit: '分钟'},
]

const columns = [
  {
    title: '频道名称',
    dataIndex: 'channelName',
    key: 'channelName',
    className: style.header,
    width: '16%',
    render(text) {
      return text;
    }
  },
  {
    title: '排名',
    dataIndex: 'uid',
    key: 'uid',
    className: style.header,
    width: '5%',
  },
  {
    title: '用户指数',
    dataIndex: 'userIndex',
    key: 'userIndex',
    className: style.header,
    width: '16%',
    sorter(a, b) {
      return a.userIndex - b.userIndex;
    },
  },
  {
    title: '覆盖率(%)',
    dataIndex: 'coverRatio',
    key: 'coverRatio',
    className: style.header,
    width: '16%',
    sorter(a, b) {
      return a.coverRatio - b.coverRatio;
    },
  },
  {
    title: '市占率(%)',
    dataIndex: 'marketRatio',
    key: 'marketRatio',
    className: style.header,
    width: '16%',
    sorter(a, b) {
      return a.marketRatio - b.marketRatio;
    },
  },
  {
    title: '户均使用时长(分钟)',
    dataIndex: 'useTimeAVG',
    key: 'useTimeAVG',
    className: style.header,
    width: '16%',
    sorter(a, b) {
      return a.useTimeAVG - b.useTimeAVG;
    },
  },
]

class ChannelOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kpi: kpis[0],
      option: {},
      tableData: [],
    }
  }

  componentWillMount() {
    this._getData(this, this.props)
  }

  _getData(bind, props, type = '0', dateType = 'D', start = '20150501') {
    fetch(REST_API_BASE_URL + 'channelOrder?type=' + type + '&dateType=' + dateType + '&start=' + start)
      .then(response => response.json())
      .then(function (result) {
        const labels = _.map(result,'channelName');
        let datas = []
        for (let i = 0; i < result.length; i++) {
          datas.push({
            value: result[i][bind.state.kpi.value],
            rank: result[i].uid,
          })
        }
//        console.log('>>> Overview', labels, datas)
        const chartData = getOrderOption(labels,datas,bind.state.kpi.unit,bind.state.kpi.label)
        bind.setState({ tableData: result, option: chartData, remoteLoading: false })
        return result
      })
      .catch(function (ex) {
        console.log(ex)
      })
  }

  search(channelType,dateType,start) {
    console.log('>>> Search:',channelType,dateType,start)
    this._getData(this,this.props,channelType,dateType,start);
  }

  onKChange(e) {
    const selected = e.target.value
    console.log(`radio checked:${selected}`);
    let t = {};
    for (let i = 0; i < kpis.length; i++) {
      if (kpis[i].value === selected) {
        t = kpis[i]
        break;
      }
    }
//    const labels = _.take(_.map(this.state.tableData,'channelName'),10).reverse();
    const labels = _.map(this.state.tableData,'channelName');
//    const datas = _.take(_.map(this.state.tableData,t.value),10).reverse();
//    const datas = _.take(_.map(this.state.tableData,t.value),50);
    let datas = []
    for (let i = 0; i < this.state.tableData.length; i++) {
      datas.push({
        value: this.state.tableData[i][t.value],
        rank: this.state.tableData[i].uid,
      })
    }
    const chartData = getOrderOption(labels,datas,t.unit,t.label)
    this.setState({kpi: t, option: chartData})
  }

  render() {
    const { foo } = this.props

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox2 showTime onSearch={(channelType,dateType,start) => this.search(channelType,dateType,start)}/>
        </Panel>
        <Panel height={theme.CHART_PANEL_HEIGHT} className={style.panel}>
          <ECharts closeLineHeight="70%" option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="直播频道排名" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

ChannelOrder.propTypes = {
}

export default ChannelOrder

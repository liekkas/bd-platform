/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, KpiGroup, SearchBox4, DataGrid } from '../../../components'
import style from '../../style.scss'
import { getOrderOption } from '../../../tools/service'
import { REST_API_BASE_URL } from '../../../config'
import _ from 'lodash'

const kpis = [
  {value:'userIndex', label: '用户指数', unit: ''},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
  {value:'marketRatio', label: '市占率', unit: '%'},
  {value:'useTimeAVG', label: '户均使用时长', unit: '分钟'},
]

const columns = [
  {
    title: '节目名称',
    dataIndex: 'showName',
    key: 'showName',
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
    width: '4%',
  },
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
    title: '播出时间',
    dataIndex: 'dateTime',
    key: 'dateTime',
    className: style.header,
    width: '12%',
  },
  {
    title: '用户指数',
    dataIndex: 'userIndex',
    key: 'userIndex',
    className: style.header,
    width: '10%',
  },
  {
    title: '覆盖率(%)',
    dataIndex: 'coverRatio',
    key: 'coverRatio',
    className: style.header,
    width: '10%',
//    render(text) {
//      return text + '%';
//    }
  },
  {
    title: '市占率(%)',
    dataIndex: 'marketRatio',
    key: 'marketRatio',
    className: style.header,
    width: '10%',
  },
  {
    title: '户均使用时长(分钟)',
    dataIndex: 'useTimeAVG',
    key: 'useTimeAVG',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '分钟';
//    }
  },
]

class ShowsOrder extends React.Component {
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

  _getData(bind, props, type = '0', channel = '0', dateType = 'D', start = '20150501') {
    fetch(REST_API_BASE_URL + 'showsOrder?type=' + type + '&dateType=' + dateType + '&start=' + start + '&channel=' + encodeURI(encodeURI(channel)))
      .then(response => response.json())
      .then(function (result) {
        const labels = _.map(result,'showName');
        const datas = _.map(result,bind.state.kpi.value);
//        console.log('>>> Overview', labels, datas)
        const chartData = getOrderOption(labels,datas,bind.state.kpi.unit,bind.state.kpi.label)
        bind.setState({ tableData: result, option: chartData, remoteLoading: false })
        return result
      })
      .catch(function (ex) {
        console.log(ex)
      })
  }

  search(channelType,channelName,dateType,start) {
    console.log('>>> ShowOrder#Search:',channelType,channelName,dateType,start)
    this._getData(this,this.props,channelType,channelName,dateType,start);
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
    const labels = _.map(this.state.tableData,'showName');
    const datas = _.map(this.state.tableData,t.value);
    const chartData = getOrderOption(labels,datas,t.unit,t.label)
    this.setState({kpi: t, option: chartData})
  }

  render() {
    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox4 showTime onSearch={(a,b,c,d) => this.search(a,b,c,d)}/>
        </Panel>
        <Panel height="300" className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="直播节目排名" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

export default ShowsOrder

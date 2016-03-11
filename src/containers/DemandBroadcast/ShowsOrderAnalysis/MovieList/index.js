/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox2, KpiGroup, DataGrid } from '../../../../components'
import style from '../../../style.scss'
import { getOrderOption } from '../../../../tools/service'
import { REST_API_BASE_URL } from '../../../../config'
import _ from 'lodash'
const kpis = [
  {value:'userIndex', label: '用户指数', unit: ''},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
  {value:'marketRatio', label: '市占率', unit: '%'},
  {value:'userTimeAVG', label: '户均使用时长', unit: '分钟'},
]

const columns = [
  {
    title: '电影名称',
    dataIndex: 'showName',
    key: 'showName',
    className: style.header,
    width: '20%',
    render(text) {
      return text;
    }
  },
  {
    title: '排名',
    dataIndex: 'uid',
    key: 'uid',
    className: style.header,
    width: '10%',
  },
  {
    title: '用户指数',
    dataIndex: 'userIndex',
    key: 'userIndex',
    className: style.header,
    width: '15%',
  },
  {
    title: '覆盖率(%)',
    dataIndex: 'coverRatio',
    key: 'coverRatio',
    className: style.header,
    width: '15%',
//    render(text) {
//      return text + '%';
//    }
  },
  {
    title: '市占率(%)',
    dataIndex: 'marketRatio',
    key: 'marketRatio',
    className: style.header,
    width: '15%',
  },
  {
    title: '户均使用时长(分钟)',
    dataIndex: 'userTimeAVG',
    key: 'userTimeAVG',
    className: style.header,
    width: '15%',
//    render(text) {
//      return text + '分钟';
//    }
  },
]

class MovieList extends React.Component {
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

  _getData(bind, props, dateType = 'D', start = '20150501') {
    fetch(REST_API_BASE_URL + 'showOrder?type=1&dateType=' + dateType + '&start=' + start)
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

  search(channelType,dateType,start) {
    console.log('>>> Search:',dateType,start)
    this._getData(this,this.props,dateType,start);
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
          <SearchBox2 showTime simpleMode onSearch={(a,b,c) => this.search(a,b,c)}/>
        </Panel>
        <Panel height="300" className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="电影榜单" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

export default MovieList

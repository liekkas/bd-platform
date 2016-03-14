/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox, KpiGroup, DataGrid } from '../../../../components'
import style from '../../../style.scss'
import { getSingleOption } from '../../../../tools/service'
import { REST_API_BASE_URL, theme } from '../../../../config'
import _ from 'lodash'

const kpis = [
  {value:'userTime', label: '点播时长', unit: '分钟'},
  {value:'userTimeAVG', label: '户均点播时长', unit: '分钟'},
  {value:'requestTimes', label: '点播次数', unit: '次'},
  {value:'requestAVG', label: '户均点播次数', unit: '次'},
  {value:'requestOne', label: '单次点播时长', unit: '分钟'},
]

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    className: style.header,
    width: '16%',
    render(text) {
      return text;
    }
  },
  {
    title: '点播时长(分钟)',
    dataIndex: 'userTime',
    key: 'userTime',
    className: style.header,
    width: '16%',
  },
  {
    title: '户均点播时长(分钟)',
    dataIndex: 'userTimeAVG',
    key: 'userTimeAVG',
    className: style.header,
    width: '16%',
  },
  {
    title: '点播次数(次)',
    dataIndex: 'requestTimes',
    key: 'requestTimes',
    className: style.header,
    width: '16%',
  },
  {
    title: '户均点播次数(次)',
    dataIndex: 'requestAVG',
    key: 'requestAVG',
    className: style.header,
    width: '16%',
  },
  {
    title: '单次点播时长(分钟)',
    dataIndex: 'requestOne',
    key: 'requestOne',
    className: style.header,
    width: '16%',
  },
]

class DemandUserBehave extends React.Component {
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

  _getData(bind, props, dateType = 'D', start = '20150501', end = '20151031') {
    fetch(REST_API_BASE_URL + 'userBehave?type=2&dateType=' + dateType + '&start=' + start + '&end=' + end)
      .then(response => response.json())
      .then(function (result) {
        const labels = _.map(result,'date');
        const datas = _.map(result,bind.state.kpi.value);
//        console.log('>>> Overview', labels, datas)
        const chartData = getSingleOption(labels,datas,bind.state.kpi.unit,bind.state.kpi.label)
        bind.setState({ tableData: result, option: chartData, remoteLoading: false })
        return result
      })
      .catch(function (ex) {
        console.log(ex)
      })
  }

  search(dateType,start,end) {
    console.log('>>> Search:',dateType,start,end)
    this._getData(this,this.props,dateType,start,end);
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
    const labels = _.map(this.state.tableData,'date');
    const datas = _.map(this.state.tableData,t.value);
    const chartData = getSingleOption(labels,datas,t.unit,t.label)
    this.setState({kpi: t, option: chartData})
  }

  render() {
    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox showTime onSearch={(a,b,c) => this.search(a,b,c)}/>
        </Panel>
        <Panel height={theme.CHART_PANEL_HEIGHT} className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="用户行为" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

export default DemandUserBehave

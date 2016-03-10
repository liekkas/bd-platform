/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox, KpiGroup, DataGrid } from '../../../components'
import style from './style.scss'
import { mockData3, mockData4,mockTableHeader, mockTable } from '../../../tools/dataMock'
import { getMultiOption } from '../../../tools/service'
import { REST_API_BASE_URL } from '../../../config'
import _ from 'lodash'

const tables = [
  {value:'bizType', label: '业务类别'},
  {value:'userNum', label: '用户数'},
  {value:'coverRatio', label: '覆盖率'},
  {value:'userTime', label: '使用时长'},
  {value:'userTimeAVG', label: '户均使用时长'},
]

const kpis = [
  {value:'userNum', label: '用户数', unit: '户'},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
  {value:'userTime', label: '使用时长', unit: '分钟'},
  {value:'userTimeAVG', label: '户均使用时长', unit: '分钟'},
]

//const columns = mockTableHeader(tables)

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
    title: '业务类别',
    dataIndex: 'bizType',
    key: 'bizType',
    className: style.header,
    width: '10%',
  },
  {
    title: '用户数',
    dataIndex: 'userNum',
    key: 'userNum',
    className: style.header,
    width: '16%',
    render(text) {
      return text + '户';
    }
  },
  {
    title: '覆盖率',
    dataIndex: 'coverRatio',
    key: 'coverRatio',
    className: style.header,
    width: '16%',
    render(text) {
      return text + '%';
    }
  },
  {
    title: '使用时长',
    dataIndex: 'userTime',
    key: 'userTime',
    className: style.header,
    width: '18%',
    render(text) {
      return text + '分钟';
    }
  },
  {
    title: '户均使用时长',
    dataIndex: 'userTimeAVG',
    key: 'userTimeAVG',
    className: style.header,
    width: '18%',
    render(text) {
      return text + '分钟';
    }
  },
];

class BusinessOverview extends React.Component {
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
    fetch(REST_API_BASE_URL + 'allBizOverview?dateType=' + dateType + '&start=' + start + '&end=' + end)
      .then(response => response.json())
      .then(function (result) {
        const labels = _.map(result['zb'],'date');
        const datas1 = _.map(result['zb'],bind.state.kpi.value);
        const datas2 = _.map(result['db'],bind.state.kpi.value);
//        console.log('>>> Overview', labels, datas)
        const chartData = getMultiOption(labels,[datas1,datas2],['直播','点播'],bind.state.kpi.unit,bind.state.kpi.label)

        const tableData = []
        const num = result['zb'].length
        for (let i = 0; i < num; i++) {
          tableData.push(_.merge(result['zb'][i],{bizType: '直播'}))
          tableData.push(_.merge(result['db'][i],{bizType: '点播'}))
        }

        bind.setState({ tableData, option: chartData, remoteLoading: false })
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

    const zb = _.filter(this.state.tableData, function(o) { return o.bizType === '直播' });
    const db = _.filter(this.state.tableData, function(o) { return o.bizType === '点播' });

    const labels = _.map(zb,'date');

    const datas1 = _.map(zb,t.value);
    const datas2 = _.map(db,t.value);
    const chartData = getMultiOption(labels,[datas1,datas2],['直播','点播'],t.unit,t.label)
    this.setState({kpi: t, option: chartData})
  }

  render() {
    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox showTime onSearch={(a,b,c) => this.search(a,b,c)}/>
        </Panel>
        <Panel height="300" className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="全业务概况" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

export default BusinessOverview

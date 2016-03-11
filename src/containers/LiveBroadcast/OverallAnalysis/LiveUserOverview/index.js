/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox, DataGrid, KpiGroup } from '../../../../components'
import style from '../../../style.scss'
import { getSingleOption } from '../../../../tools/service'
import { REST_API_BASE_URL } from '../../../../config'
import _ from 'lodash'

const kpis = [
  {value:'userNum', label: '用户数', unit: '户'},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
  {value:'userGrowRatio', label: '用户增长率', unit: '%'},
  {value:'newUserNum', label: '流入用户数', unit: '户'},
  {value:'lostUserNum', label: '流出用户数', unit: '户'},
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
    title: '用户数(户)',
    dataIndex: 'userNum',
    key: 'userNum',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '户';
//    }
  },
  {
    title: '覆盖率(%)',
    dataIndex: 'coverRatio',
    key: 'coverRatio',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '%';
//    }
  },
  {
    title: '用户增长率(%)',
    dataIndex: 'userGrowRatio',
    key: 'userGrowRatio',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '%';
//    }
  },
  {
    title: '流入用户数(户)',
    dataIndex: 'newUserNum',
    key: 'newUserNum',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '户';
//    }
  },
  {
    title: '流出用户数(户)',
    dataIndex: 'lostUserNum',
    key: 'lostUserNum',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '户';
//    }
  },
]

class LiveUserOverview extends React.Component {
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
    fetch(REST_API_BASE_URL + 'userOverview?type=1&dateType=' + dateType + '&start=' + start + '&end=' + end)
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
    const { foo } = this.props

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox onSearch={(a,b,c) => this.search(a,b,c)}/>
        </Panel>
        <Panel height="300" className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="用户概况" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

LiveUserOverview.propTypes = {
}

export default LiveUserOverview

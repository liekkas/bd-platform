/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox, DataGrid, KpiGroup } from '../../../../components'
import style from '../../../style.scss'
import { getMultiOption } from '../../../../tools/service'
import { REST_API_BASE_URL } from '../../../../config'
import _ from 'lodash'

const kpis = [
  {value:'showRatio', label: '节目比重', unit: '%'},
  {value:'marketRatio', label: '市占率', unit: '%'},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
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
    title: '节目类型',
    dataIndex: 'showType',
    key: 'showType',
    className: style.header,
    width: '16%',
    render(text) {
      return text;
    }
  },
  {
    title: '节目比重(%)',
    dataIndex: 'showRatio',
    key: 'showRatio',
    className: style.header,
    width: '16%',
  },
  {
    title: '市占率(%)',
    dataIndex: 'marketRatio',
    key: 'marketRatio',
    className: style.header,
    width: '16%',
  },
  {
    title: '覆盖率(%)',
    dataIndex: 'coverRatio',
    key: 'coverRatio',
    className: style.header,
    width: '16%',
  },
]

let type1 = 'data1'
let type2 = 'data2'
const legends = ['电影','电视剧']

class ResUtilizationAnalysis extends React.Component {
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
    fetch(REST_API_BASE_URL + 'resUtilizationAnalysis?dateType=' + dateType + '&start=' + start + '&end=' + end)
      .then(response => response.json())
      .then(function (result) {
        const labels = _.map(result[type1],'date');
        const datas1 = _.map(result[type1],bind.state.kpi.value);
        const datas2 = _.map(result[type2],bind.state.kpi.value);
        const chartData = getMultiOption(labels,[datas1,datas2],legends,bind.state.kpi.unit,bind.state.kpi.label)

        const tableData = []
        const num = result[type1].length
        for (let i = 0; i < num; i++) {
          tableData.push(_.merge(result[type1][i],{channelName: type1}))
          tableData.push(_.merge(result[type2][i],{channelName: type2}))
        }

        bind.setState({ tableData, option: chartData, remoteLoading: false })
        return result
      })
      .catch(function (ex) {
        console.log(ex)
      })
  }

  search(dateType,start,end) {
    console.log('>>> ResUtilizationAnalysis Search:',dateType,start,end)
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

    const c1 = _.filter(this.state.tableData, function(o) { return o.channelName === type1 });
    const c2 = _.filter(this.state.tableData, function(o) { return o.channelName === type2 });

    const labels = _.map(c1,'date');

    const datas1 = _.map(c1,t.value);
    const datas2 = _.map(c2,t.value);

    const chartData = getMultiOption(labels,[datas1,datas2],legends,t.unit,t.label)
    this.setState({kpi: t, option: chartData})
  }

  render() {
    const { foo } = this.props

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox showTime onSearch={(a,b,c) => this.search(a,b,c)}/>
        </Panel>
        <Panel height="300" className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="资源利用率分析" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

ResUtilizationAnalysis.propTypes = {
}

export default ResUtilizationAnalysis

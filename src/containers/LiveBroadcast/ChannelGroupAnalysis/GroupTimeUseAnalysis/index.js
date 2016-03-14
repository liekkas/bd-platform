/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox, DataGrid, KpiGroup, SVGComp } from '../../../../components'
import style from '../../../style.scss'
import { getMultiOption, getPieOption } from '../../../../tools/service'
import { REST_API_BASE_URL, theme } from '../../../../config'
import _ from 'lodash'

const kpis = [
  {value:'userTime', label: '使用时长', unit: '分钟'},
  {value:'userTimeAVG', label: '户均使用时长', unit: '分钟'},
  {value:'marketRatio', label: '市占率', unit: '%'},
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
    title: '频道类型',
    dataIndex: 'channelType',
    key: 'channelType',
    className: style.header,
    width: '16%',
    render(text) {
      return text;
    }
  },
  {
    title: '使用时长(分钟)',
    dataIndex: 'userTime',
    key: 'userTime',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '分钟';
//    }
  },
  {
    title: '户均使用时长(分钟)',
    dataIndex: 'userTimeAVG',
    key: 'userTimeAVG',
    className: style.header,
    width: '16%',
//    render(text) {
//      return text + '分钟';
//    }
  },
  {
    title: '市占率(%)',
    dataIndex: 'marketRatio',
    key: 'marketRatio',
    className: style.header,
    width: '16%',
  },
]

let type1 = 'data1'
let type2 = 'data2'
const legends = ['央视频道','卫视频道']

class GroupTimeUseAnalysis extends React.Component {
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
    fetch(REST_API_BASE_URL + 'groupTimeUseAnalysis?dateType=' + dateType + '&start=' + start + '&end=' + end)
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
    console.log('>>> GroupTimeUseAnalysis Search:',dateType,start,end)
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
        <Panel height={theme.CHART_PANEL_HEIGHT} className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="频道组使用时长分析" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

GroupTimeUseAnalysis.propTypes = {
}

export default GroupTimeUseAnalysis
//
//{
//  this.state.kpi.value === 'marketRatio'
//    ? <SVGComp data={this.state.option}/>
//    : <ECharts option={this.state.option}/>
//}
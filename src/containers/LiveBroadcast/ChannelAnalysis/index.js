/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, CompareSearchBox, DataGrid, KpiGroup } from '../../../components'
import style from '../../style.scss'
import { getMultiOption } from '../../../tools/service'
import { REST_API_BASE_URL, theme } from '../../../config'
import _ from 'lodash'

const kpis = [
  {value:'userIndex', label: '用户指数', unit: ''},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
  {value:'marketRatio', label: '市占率', unit: '%'},
  {value:'useTimeAVG', label: '户均使用时长', unit: '分钟'},
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
    title: '用户指数',
    dataIndex: 'userIndex',
    key: 'userIndex',
    className: style.header,
    width: '16%',
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
    title: '市占率(%)',
    dataIndex: 'marketRatio',
    key: 'marketRatio',
    className: style.header,
    width: '16%',
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

class ChannelAnalysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kpi: kpis[0],
      option: {},
      tableData: [],
      channel1: 'CCTV-1',
      channel2: '湖南卫视',
    }
  }

  componentWillMount() {
    this._getData(this, this.props)
  }

  _getData(bind, props, channel1 = 'CCTV-1', channel2 = '湖南卫视',dateType = 'D', start = '20150501', end = '20151031') {
    fetch(REST_API_BASE_URL + 'channelAnalysis?type=1&dateType=' + dateType + '&start=' + start
      + '&end=' + end + '&channel1=' + encodeURI(encodeURI(channel1))
      + '&channel2=' + encodeURI(encodeURI(channel2)))
      .then(response => response.json())
      .then(function (result) {
        const labels = _.map(result['channel1'],'date');
        const datas1 = _.map(result['channel1'],bind.state.kpi.value);
        const datas2 = _.map(result['channel2'],bind.state.kpi.value);
        const chartData = getMultiOption(labels,[datas1,datas2],[channel1,channel2],bind.state.kpi.unit,bind.state.kpi.label)

        const tableData = []
        const num = result['channel1'].length
        for (let i = 0; i < num; i++) {
          tableData.push(_.merge(result['channel1'][i],{channelName: channel1}))
          tableData.push(_.merge(result['channel2'][i],{channelName: channel2}))
        }

        bind.setState({ tableData, option: chartData, remoteLoading: false })
        return result
      })
      .catch(function (ex) {
        console.log(ex)
      })
  }

  search(dateType,start,end,channel1,channel2) {
    console.log('>>> ChannelAnalysis Search:',dateType,start,end,channel1,channel2)
    this.setState({channel1,channel2})
    this._getData(this,this.props,channel1,channel2,dateType,start,end);
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

    const {channel1,channel2} = this.state

    const c1 = _.filter(this.state.tableData, function(o) { return o.channelName === channel1 });
    const c2 = _.filter(this.state.tableData, function(o) { return o.channelName === channel2 });

    const labels = _.map(c1,'date');

    const datas1 = _.map(c1,t.value);
    const datas2 = _.map(c2,t.value);

    const chartData = getMultiOption(labels,[datas1,datas2],[this.state.channel1,this.state.channel2],t.unit,t.label)
    this.setState({kpi: t, option: chartData})
  }

  render() {
    const { foo } = this.props

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <CompareSearchBox showTime onSearch={(a,b,c,d,e) => this.search(a,b,c,d,e)}/>
        </Panel>
        <Panel height={theme.CHART_PANEL_HEIGHT} className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} onKpiChange={(e) => this.onKChange(e)}/>
        </Panel>
        <DataGrid title="直播频道分析" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

ChannelAnalysis.propTypes = {
  foo: PropTypes.string.isRequired,
}
ChannelAnalysis.defaultProps = {
  foo: 'bar',
}

export default ChannelAnalysis

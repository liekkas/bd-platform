/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox3, DataGrid, KpiGroup } from '../../../../components'
import style from '../../../style.scss'
import { getRadarOption, getPieOption } from '../../../../tools/service'
import { REST_API_BASE_URL, theme } from '../../../../config'
import _ from 'lodash'

const kpis = [
  {value:'marketRatio', label: '市占率', unit: '%'},
]

const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    className: style.header,
    width: '25%',
    render(text) {
      return text;
    }
  },
  {
    title: 'TOP分组',
    dataIndex: 'group',
    key: 'group',
    className: style.header,
    width: '25%',
    render(text) {
      return text;
    }
  },
  {
    title: '点播时长(分钟)',
    dataIndex: 'userTime',
    key: 'userTime',
    className: style.header,
    width: '25%',
  },
  {
    title: '市占率(%)',
    dataIndex: 'marketRatio',
    key: 'marketRatio',
    className: style.header,
    width: '25%',
//    render(text) {
//      return text + '%';
//    }
  },
]

class ShowCenterAnalysis extends React.Component {
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

  _getData(bind, props, showType = '1', groupType = '10', dateType = 'D', start = '20150501') {
    fetch(REST_API_BASE_URL + 'showCenterAnalysis?dateType=' + dateType + '&start=' + start
      + '&showType=' + showType + '&groupType=' + groupType)
      .then(response => response.json())
      .then(function (result) {
        const labels = _.map(result.data,'group');
        const datas = _.map(result.data,'marketRatio');
//        const chartData = getPieOption(labels,datas)
        const chartData = getRadarOption(labels,datas)
        bind.setState({ tableData: result.data, option: chartData, remoteLoading: false })
        return result
      })
      .catch(function (ex) {
        console.log(ex)
      })
  }

  search(showType,groupType,dateType,start) {
    console.log('>>> ShowCenterAnalysis Search:',showType,groupType,dateType,start)
    this._getData(this,this.props,showType,groupType,dateType,start);
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
    const labels = _.map(this.state.tableData,'group');
    const datas = _.map(this.state.tableData,'marketRatio');
//    const chartData = getPieOption(labels,datas)
    const chartData = getRadarOption(labels,datas)
    this.setState({kpi: t, option: chartData})
  }

  render() {
    const { foo } = this.props

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox3 onSearch={(a,b,c,d) => this.search(a,b,c,d)}/>
        </Panel>
        <Panel height={theme.CHART_PANEL_HEIGHT} className={style.panel}>
          <ECharts option={this.state.option}/>
          <KpiGroup kpis={kpis} />
        </Panel>
        <DataGrid title="节目集中度分析" columns={columns} datas={this.state.tableData}/>
      </div>
    )
  }
}

ShowCenterAnalysis.propTypes = {
}

export default ShowCenterAnalysis

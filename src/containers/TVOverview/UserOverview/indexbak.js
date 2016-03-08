/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts, SearchBox } from '../../../components'
import style from './style.scss'
import Table from 'antd/lib/table'
import Radio from 'antd/lib/radio';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import { Pagination } from 'antd';

//import RadioButton from 'material-ui/lib/radio-button';
//import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import { mockData, mockTableHeader, mockTable } from '../../../tools/dataMock'
import { getSingleOption } from '../../../tools/service'
import { REST_API_BASE_URL } from '../../../config'
import _ from 'lodash'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const kpis = [
  {value:'userNum', label: '用户数', unit: '户'},
  {value:'coverRatio', label: '覆盖率', unit: '%'},
  {value:'userGrowRatio', label: '用户增长率', unit: '%'},
  {value:'newUserNum', label: '新增用户数', unit: '户'},
  {value:'lostUserNum', label: '流失用户数', unit: '户'},
]

var products = [];

function addProducts(quantity) {
  var startId = products.length;
  for (var i = 0; i < quantity; i++) {
    var id = startId + i;
    products.push({
      id: id,
      name: "Item name " + id,
      price: 10 + i
    });
  }
}

addProducts(100);

const columns = mockTableHeader(kpis)

let start = new Date(2015,4)
let end = new Date(2015,9)

function setStart(v) {
  start = v
  console.log(start)
}

function setEnd(v) {
  end = v
  console.log(end)
}

class UserOverview extends React.Component {
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

  onKpiChanged(event, selected) {
    console.log('>>> kpi', selected);
    let t = {};
    for (let i = 0; i < kpis.length; i++) {
      if (kpis[i].value === selected) {
        t = kpis[i]
        break;
      }
    }
    const labels = _.map(this.state.tableData,'date');
    const datas = _.map(this.state.tableData,t.value);
    const chartData = getSingleOption(labels,datas,t.unit)
    this.setState({kpi: t, option: chartData})
  }

  _getData(bind, props, dateType = 'M', start = '201505', end = '201510') {
    const { config } = props

    fetch(REST_API_BASE_URL + 'userOverview?type=0&dateType=' + dateType + '&start=' + start + '&end=' + end)
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

  onShowSizeChange(current, pageSize) {
    console.log('>>> PageChange:',current, pageSize);
  }

  render() {
    const { foo } = this.props

    const styles2 = {
      defaultLabel: {
//        color: 'white',
        marginLeft: -10,
      },
      selectedLabel: {
//        color: '#ffea00',
        marginLeft: -10,
      },
      selectedIcon: {
//        fill: '#ffea00'
      },
      defaultIcon: {
//        fill: '#FFF'
      },
    };

    const pagination = {
      total: this.state.tableData.length,
      size: "",
      current: 1,
//      pageSize: 8,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      }
    };

    var options = {
      page: 2,  //which page you want to show as default
      sizePerPageList: [5,10], //you can change the dropdown list for size per page
      sizePerPage: 5,  //which size per page you want to locate as default
      paginationSize: 3,  //the pagination bar size.
      prePage: "上一页", // Previous page button text
      nextPage: "下一页", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last" // Last page button text
    }

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="90">
          <SearchBox onSearch={(a,b,c) => this.search(a,b,c)}/>
        </Panel>
        <Panel height="300" className={style.p2}>
          <ECharts option={this.state.option}/>
          <div className={style.kpiList} >
            <RadioGroup onChange={(e) => this.onKChange(e)}
                        defaultValue={this.state.kpi.value}>
              {
                kpis.map(({value, label}, index) =>
                  <RadioButton key={index} value={value}>{label}</RadioButton>)
              }
            </RadioGroup>
          </div>
        </Panel>
        <Panel title="用户概况 - 列表" height="460">
          <Table dataSource={this.state.tableData}
                 rowKey={item => item.date} useFixedHeader
                 columns={columns} size="middle"
                 className={style.table} pagination={false}/>
        </Panel>
        <div className={style.pagination}>
          <Pagination showSizeChanger showQuickJumper
                      onShowSizeChange={(a,b) => this.onShowSizeChange(a,b)}
                      defaultCurrent={1} total={this.state.tableData.length} />
        </div>
      </div>
    )
  }
}

UserOverview.propTypes = {
  foo: PropTypes.string.isRequired,
}
UserOverview.defaultProps = {
  foo: 'bar',
}

export default UserOverview

//<Panel title="用户概况 - 列表" height="460">
//  <BootstrapTable data={products} pagination={true} options={options}>
//  <TableHeaderColumn dataField="id" isKey={true}>Product ID</TableHeaderColumn>
//<TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
//<TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
//</BootstrapTable>
//</Panel>

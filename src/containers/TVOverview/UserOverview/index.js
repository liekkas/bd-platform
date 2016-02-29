/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts } from '../../../components'
import style from './style.scss'
import Table from 'antd/lib/table'
import DatePicker from 'antd/lib/date-picker'
import TimePicker from 'antd/lib/time-picker'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const Option = Select.Option
import Radio from 'antd/lib/radio';
const RadioGroup = Radio.Group;
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import { mockData, mockTableHeader, mockTable } from '../../../tools/dataMock'

const kpis = [
  {value:'userNum', label: '用户数'},
  {value:'coverRatio', label: '覆盖率'},
  {value:'userGrowRatio', label: '用户增长率'},
  {value:'newUserNum', label: '新增用户数'},
  {value:'lostUserNum', label: '流失用户数'},
]

const columns = mockTableHeader(kpis)

class UserOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kpi: kpis[0].value,
      option: mockData('月','户',100),
      tableData: mockTable(kpis),
    }
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onKpiChanged(event, selected) {
    console.log('>>> kpi', selected);
    this.setState({kpi: selected, option: mockData('月','户',100), tableData: mockTable(kpis)})
  }

  render() {
    const { foo } = this.props

    const styles2 = {
      defaultLabel: {
        color: 'white',
        marginLeft: -10,
      },
      selectedLabel: {
        color: '#FF9800',
        marginLeft: -10,
      },
      selectedIcon: {
        fill: '#FF9800'
      },
      defaultIcon: {
        fill: '#FFF'
      },
    };

    const pagination = {
      total: this.state.tableData.length,
      current: 1,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      }
    };

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="100">
          <div className={style.hgroup}>
            <label>时间分类:&nbsp;&nbsp;</label>
            <Select defaultValue="byMonth" style={{ width: 100, marginRight: '10px' }} onChange={this.handleChange}>
              <Option value="byDay">按日</Option>
              <Option value="byWeek">按周</Option>
              <Option value="byMonth">按月</Option>
            </Select>
            <DatePicker defaultValue="2015-01-01" />
            <label>&nbsp;&nbsp;至&nbsp;&nbsp;</label>
            <DatePicker defaultValue="2015-01-01" />
            &nbsp;&nbsp;
            <Button type="primary">
              <Icon type="search" />
              查询
            </Button>
          </div>
        </Panel>
        <Panel height="300" className={style.p2}>
          <RadioButtonGroup className={style.rbg} name="shipSpeed" defaultSelected={this.state.kpi}
            onChange={(event, selected) => this.onKpiChanged(event, selected)}>
            {
              kpis.map(({value, label}, index) =>
                <RadioButton value={value} label={label} key={index}
                             iconStyle={value === this.state.kpi
                               ? styles2.selectedIcon
                               : styles2.defaultIcon
                             } labelStyle={value === this.state.kpi
                               ? styles2.selectedLabel
                               : styles2.defaultLabel
                             } />
              )
            }
          </RadioButtonGroup>

          <ECharts option={this.state.option}/>
        </Panel>
        <Panel title="用户概况 - 列表" height="460">
          <Table dataSource={this.state.tableData} columns={columns}
                 className={style.table} size="middle" pagination={{pageSize: 8}}/>
        </Panel>
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

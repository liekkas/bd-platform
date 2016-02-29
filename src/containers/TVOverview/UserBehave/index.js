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
import { mockData2, mockTableHeader, mockTable } from '../../../tools/dataMock'

const kpis = [
  {value:'userTime', label: '使用时长'},
  {value:'userTimeAVG', label: '户均使用时长'},
]

const columns = mockTableHeader(kpis)

class UserBehave extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kpi: kpis[0].value,
      option: mockData2('月','户',100),
      tableData: mockTable(kpis),
    }
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onKpiChanged(event, selected) {
    console.log('>>> kpi', selected);
    this.setState({kpi: selected, option: mockData2('月','户',100), tableData: mockTable(kpis)})
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

UserBehave.propTypes = {
  foo: PropTypes.string.isRequired,
}
UserBehave.defaultProps = {
  foo: 'bar',
}

export default UserBehave

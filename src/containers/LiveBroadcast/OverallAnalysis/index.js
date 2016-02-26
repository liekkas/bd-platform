/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts } from '../../../components'
import style from './style.scss'
import Table from 'antd/lib/table'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const Option = Select.Option

class OverallAnalysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { foo } = this.props
    const dataSource = [{
      key: '1',
      date: '2016/1/1',
      userNum: 32,
      userNumIndex: '1.2%',
      useTiming: 5492,
      useTimingIndex: '2.2%'
    }, {
      key: '2',
      date: '2016/1/1',
      userNum: 32,
      userNumIndex: '1.2%',
      useTiming: 5492,
      useTimingIndex: '2.2%'
    }];

    const columns = [{
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '用户数',
      dataIndex: 'userNum',
      key: 'userNum',
    }, {
      title: '用户数环比',
      dataIndex: 'userNumIndex',
      key: 'userNumIndex',
    }, {
      title: '使用时长',
      dataIndex: 'useTiming',
      key: 'useTiming',
    }, {
      title: '使用时长环比',
      dataIndex: 'useTimingIndex',
      key: 'useTimingIndex',
    }]

    return (
      <div className={style.root}>
        <Panel title="筛选条件" height="150">
          <div className={style.hgroup}>
            <label>时间分类:&nbsp;&nbsp;</label>
            <Select defaultValue="lucy" style={{ width: 100, marginRight: '10px' }} onChange={this.handleChange}>
              <Option value="jack">按日期</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
            <DatePicker defaultValue="2015-01-01" />
            <label>&nbsp;&nbsp;至&nbsp;&nbsp;</label>
            <DatePicker defaultValue="2015-01-01" />
          </div>
          <div className={style.hgroup}>
            <label>城市选择:&nbsp;&nbsp;</label>
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
        <Panel title="总体分析" height="300">
          <ECharts config={{type: 'bar',mode: 'local',}}/>
        </Panel>
        <Panel title="总体分析2" height="300">
          <Table dataSource={dataSource} columns={columns} className={style.table}/>
        </Panel>
      </div>
    )
  }
}

OverallAnalysis.propTypes = {
  foo: PropTypes.string.isRequired,
}
OverallAnalysis.defaultProps = {
  foo: 'bar',
}

export default OverallAnalysis

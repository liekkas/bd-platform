/**
 * Created by liekkas on 16/3/5.
 */
import React, { PropTypes } from 'react'
import ByMonth from './ByMonth'
import ByWeek from './ByWeek'
import ByDay from './ByDay'
import ByHour from './ByHour'
import ByChannel from './ByChannel'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import { InputNumber } from 'antd'
import Icon from 'antd/lib/icon'
const Option = Select.Option
import style from './style.scss'

let start = '20150501'
let end
let day = '20150501'
let hour = '0'
let channelType = '0'

class SearchBox2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateType: props.dateType,
      channelType: props.channelType,
      start: '20150501',
    }
  }

  handleDateTypeChange(value) {
    let start,end
    switch (value) {
      case 'M':
        start = '201505'
        end = '201510'
        this.setState({start: '201505', end: '201510'})
        break
      case 'W':
        start = '201518'
        end = '201544'
        this.setState({start: '201518', end: '201544'})
        break
      case 'D':
        start = '20150501'
        end = '20151031'
        this.setState({start: '20150501', end: '20151031'})
        break
      case 'T':
        start = '20150501-0'
        end = '20150501-23'
        this.setState({start: '20150501-0', end: '20150501-23'})
        break
    }
    this.setState({dateType: value})

//    this.props.onSearch(channelType,value,start)
  }

  handleStartChange(v) {
    start = v
    this.setState({start: v})
  }

  handleEndChange(v) {
    end = v
    this.setState({end: v})
  }

  handleDayChangeByHour(v) {
    day = v
    start = day + '-' + hour
    this.setState({start: day + '-' + hour})
  }

  handleHourChangeByHour(v) {
    hour = v
    start = day + '-' + hour
    this.setState({start: day + '-' + hour})
  }

  handleChannelTypeChange(value) {
    channelType = value
//    this.props.onSearch(channelType,this.state.dateType,start)
    this.setState({channelType: value})
  }

  renderDate() {
    switch (this.state.dateType) {
      case 'M':
        return <ByMonth rangeMode={false} onStartChange={(v) => this.handleStartChange(v)}
                        onEndChange={(v) => this.handleEndChange(v)} />
      case 'W':
        return <ByWeek rangeMode={false} onStartChange={(v) => this.handleStartChange(v)}
                       onEndChange={(v) => this.handleEndChange(v)} />
      case 'D':
        return <ByDay rangeMode={false} onStartChange={(v) => this.handleStartChange(v)}
                      onEndChange={(v) => this.handleEndChange(v)} />
      case 'T':
        return <ByHour showHour={true}
                       onDayChange={(day) => this.handleDayChangeByHour(day)}
                       onHourChange={(hour) => this.handleHourChangeByHour(hour)}
                       onCompareDayChange={(v) => this.handleEndChange(v)} />
    }
  }

  renderSelect() {
    if (this.props.showTime) {
      return <Select defaultValue="D" style={{ width: 90, marginRight: '10px' }}
                     onChange={(e) => this.handleDateTypeChange(e)}>
        <Option value="D">按日</Option>
        <Option value="W">按周</Option>
        <Option value="M">按月</Option>
        <Option value="T">按时</Option>
      </Select>
    } else {
      return <Select defaultValue="D" style={{ width: 90, marginRight: '10px' }}
                     onChange={(e) => this.handleDateTypeChange(e)}>
        <Option value="D">按日</Option>
        <Option value="W">按周</Option>
        <Option value="M">按月</Option>
      </Select>
    }
  }

  renderChannelSelect() {
    if (this.props.simpleMode) {
      return
    }
  }

  render() {
    const { showTime } = this.props
    return (
      <div className={style.root}>
        <div className={style.label}>
          <label>时间分类:</label>
        </div>

        { this.renderSelect() }
        { this.renderDate() }

        &nbsp;&nbsp;

        {
          this.props.simpleMode
            ? null
            : <div className={style.label}>
                &nbsp;&nbsp;
                <label>频道分类:</label>
              </div>
        }

        {
          this.props.simpleMode
            ? null
            : <Select defaultValue={this.props.channelType}
                      style={{ width: 90 }}
                      onChange={(v) => this.handleChannelTypeChange(v)}>
                <Option value="0">全部</Option>
                <Option value="1">央视</Option>
                <Option value="2">卫视</Option>
              </Select>
        }

        &nbsp;&nbsp;

        <Button type="primary" onClick={() =>
          this.props.onSearch(this.state.channelType,this.state.dateType,this.state.start)}>
          <Icon type="search" />
          查询
        </Button>

      </div>
    )
  }
}

SearchBox2.propTypes = {
  dateType: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
  showTime: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  simpleMode: PropTypes.bool.isRequired,
}
SearchBox2.defaultProps = {
  dateType: 'D',
  channelType: '0',
  showTime: false,
  simpleMode: false,
}

export default SearchBox2

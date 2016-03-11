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
let showType = '0'

class SearchBox3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateType: props.dateType,
      showType: props.showType,
      groupType: props.groupType,
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

  handleshowTypeChange(value) {
    showType = value
//    this.props.onSearch(showType,this.state.dateType,start)
    this.setState({showType: value})
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

        <div className={style.label}>
          <label>节目分类:</label>
        </div>

        <Select defaultValue={this.props.showType}
                style={{ width: 80 }}
                onChange={(v) => this.setState({showType: v})}>
          <Option value="1">电影</Option>
          <Option value="2">电视剧</Option>
        </Select>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <div className={style.label}>
          <label>TOP组分类: { this.props.showGroup ? null : "TOP10" }</label>
        </div>

        {
          this.props.showGroup
            ? <Select defaultValue={this.props.groupType}
                      style={{ width: 80 }}
                      onChange={(v) => this.setState({groupType: v})}>
                <Option value="10">TOP10</Option>
                <Option value="20">TOP20</Option>
                <Option value="50">TOP50</Option>
              </Select>
            : null
        }

        &nbsp;&nbsp;

        <Button type="primary" onClick={() =>
          this.props.onSearch(this.state.showType,this.state.groupType,this.state.dateType,this.state.start)}>
          <Icon type="search" />
          查询
        </Button>

      </div>
    )
  }
}

SearchBox3.propTypes = {
  dateType: PropTypes.string.isRequired,
  showType: PropTypes.string.isRequired,
  groupType: PropTypes.string.isRequired,
  showTime: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  simpleMode: PropTypes.bool.isRequired,
  showGroup: PropTypes.bool.isRequired,
}
SearchBox3.defaultProps = {
  dateType: 'D',
  showType: '1',
  groupType: '10',
  showTime: false,
  simpleMode: false,
  showGroup: false,
}

export default SearchBox3

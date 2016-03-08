/**
 * Created by liekkas on 16/3/5.
 */
import React, { PropTypes } from 'react'
import ByMonth from './ByMonth'
import ByWeek from './ByWeek'
import ByDay from './ByDay'
import ByHour from './ByHour'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const Option = Select.Option
import style from './style.scss'

let start,end

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateType: props.dateType,
    }
  }

  handleDateTypeChange(value) {
    switch (value) {
      case 'M':
        start = '201505'
        end = '201510'
        break
      case 'W':
        start = '201518'
        end = '201544'
        break
      case 'D':
        start = '20150501'
        end = '20151031'
        break
      case 'T':
        start = '20150501-0'
        end = '20150501-23'
        break
    }
    this.setState({dateType: value})
    this.props.onSearch(value,start,end)
  }

  handleStartChange(v) {
    start = v
  }

  handleEndChange(v) {
    end = v
  }

  handleDayChangeByHour(v) {
    start = v + '-0'
    end = v + '-23'
  }

  renderDate() {
    switch (this.state.dateType) {
      case 'M':
        return <ByMonth onStartChange={(v) => this.handleStartChange(v)}
                        onEndChange={(v) => this.handleEndChange(v)} />
      case 'W':
        return <ByWeek onStartChange={(v) => this.handleStartChange(v)}
                       onEndChange={(v) => this.handleEndChange(v)} />
      case 'D':
        return <ByDay onStartChange={(v) => this.handleStartChange(v)}
                      onEndChange={(v) => this.handleEndChange(v)} />
      case 'T':
        return <ByHour onDayChange={(v) => this.handleDayChangeByHour(v)}
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

        <Button type="primary" onClick={() =>
          this.props.onSearch(this.state.dateType,start,end)}>
          <Icon type="search" />
          查询
        </Button>

      </div>
    )
  }
}

SearchBox.propTypes = {
  dateType: PropTypes.string.isRequired,
  showTime: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
}
SearchBox.defaultProps = {
  dateType: 'D',
  showTime: false,
}

export default SearchBox

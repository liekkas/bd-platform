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

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateType: props.dateType,
      start: props.defaultStart,
      end: props.defaultEnd,
    }
  }

  disabledStartDate(startValue) {
//    console.log(startValue.toLocaleString(),new Date(2015,4,1).toLocaleString())
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime()
//      || startValue.getTime() <= new Date(2015,4,1).getTime()
  }

  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime()
//      || endValue.getTime() >= new Date(2015,9,30).getTime()
  }

  onChange(field, value) {
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  }

  handleDateTypeChange(value) {
    switch (value) {
      case 'M':
//        start = new Date(2015,4)
//        end = new Date(2015,9)
        break;
      case 'W':
//        start = new Date(2015,3,27)
//        end = new Date(2015,9,26)
        break
      default:
//        start = new Date(2015,4,1)
//        end = new Date(2015,4,31)
        break
    }
    this.setState({dateType: value})
  }

  searchData(dataType) {
    let formatStart,formatEnd
//    switch (dataType) {
//      case 'M':
//        formatStart = dateFormat(start,'yyyymm')
//        formatEnd = dateFormat(end,'yyyymm')
//        break
//      case 'W':
//        formatStart = dateFormat(start,'yyyyW')
//        formatEnd = dateFormat(end,'yyyyW')
//        break
//      case 'D':
//        formatStart = dateFormat(start,'yyyymmdd')
//        formatEnd = dateFormat(end,'yyyymmdd')
//        break
//    }
//    console.log(start,formatStart, end,formatEnd)
  }

  renderDate() {
    const { defaultMonthValue, defaultWeekValue, defaultDayValue, defaultTimeValue } = this.props
    switch (this.state.dateType) {
      case 'M':
        return <ByMonth onSearch={(start,end) => this.props.onSearch('M',start,end)}/>
      case 'W':
        return <ByWeek onSearch={(start,end) => this.props.onSearch('W',start,end)}/>
      case 'D':
        return <ByDay onSearch={(start,end) => this.props.onSearch('D',start,end)}/>
      case 'T':
        return <ByHour onSearch={(start,end) => this.props.onSearch('T',start,end)}/>
    }
  }

  renderSelect() {
    if (this.props.showTime) {
      return <Select defaultValue="M" style={{ width: 90, marginRight: '10px' }}
                     onChange={(e) => this.handleDateTypeChange(e)}>
        <Option value="M">按月</Option>
        <Option value="W">按周</Option>
        <Option value="D">按日</Option>
        <Option value="T">按时</Option>
      </Select>
    } else {
      return <Select defaultValue="M" style={{ width: 90, marginRight: '10px' }}
                     onChange={(e) => this.handleDateTypeChange(e)}>
        <Option value="M">按月</Option>
        <Option value="W">按周</Option>
        <Option value="D">按日</Option>
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

      </div>
    )
  }
}

SearchBox.propTypes = {
  dateType: PropTypes.string.isRequired,
  showTime: PropTypes.bool.isRequired,
  defaultStart: PropTypes.string,
  defaultEnd: PropTypes.string,
  defaultMonthValue: PropTypes.array,
  defaultWeekValue: PropTypes.array,
  defaultDayValue: PropTypes.array,
  defaultTimeValue: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
}
SearchBox.defaultProps = {
  dateType: 'M',
  showTime: false,
  defaultStart: '2015年5月',
  defaultEnd: '2015年10月',
  defaultMonthValue: [new Date(2015,4),new Date(2015,9)],
  defaultWeekValue: [new Date(2015,3,27),new Date(2015,9,26)],
  defaultDayValue: [new Date(2015,4,1),new Date(2015,4,31)],
  defaultTimeValue: [new Date(2015,4,1)],
}

export default SearchBox

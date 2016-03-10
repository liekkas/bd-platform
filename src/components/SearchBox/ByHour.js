/**
 * Created by liekkas on 16/3/5.
 */
import React, { PropTypes } from 'react'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Select from 'antd/lib/select'
import _ from 'lodash'
import DatePicker from 'antd/lib/date-picker'
import TimePicker from 'antd/lib/time-picker'
import dateFormat from 'dateFormat'
const Option = Select.Option

let hour
class ByHour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: props.day,
      start: props.start,
      end: props.end,
    }
  }

  disabledStartDate(v) {
    if (!v) {
      return false;
    }
    return parseInt(dateFormat(v,'yyyymmdd'), 0) < parseInt(dateFormat(new Date(2015,3,1),'yyyymmdd'), 0)
      || parseInt(dateFormat(v,'yyyymmdd'), 0) > parseInt(dateFormat(new Date(2015,8,31),'yyyymmdd'), 0)
  }

  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  }

  onStartChange(v) {
    this.setState({start: v})
  }

  onEndChange(v) {
    this.setState({end: v})
  }

  getStartArr() {
    return _.range(this.props.start,this.state.end + 1)
  }

  getEndArr() {
    return _.range(this.state.start,this.props.end + 1)
  }

  onHourChange(v) {
    hour = v
    this.setState({hour: v})
//    console.log('>>> ByHour',v)
    this.props.onHourChange(v)
  }

  onChange(v) {
    this.setState({day: v, hour})
//    console.log('>>> ByHouronChange',this.state.hour, hour)
    this.props.onDayChange(dateFormat(v,'yyyymmdd'))
  }

  render() {
    const { day, start, end } = this.state
    return (
      <div>
        <DatePicker disabledDate={(v) => this.disabledStartDate(v)}
                    value={this.state.day}
                    placeholder="选择日期"
                    onChange={(v) => this.onChange(v)} />

        &nbsp;&nbsp;
        {
          this.props.showHour
            ? <Select defaultValue={this.props.start + '时'} style={{ width: 80, marginRight: '10px' }}
                      onChange={(e) => this.onHourChange(e)}>
                {
                  this.getStartArr().map((value,index) =>
                    <Option key={index} value={value}>{value}时</Option>
                  )
                }
              </Select>
            : null
        }
      </div>
    )
  }
}

ByHour.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  day: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onDayChange: PropTypes.func.isRequired,
  onHourChange: PropTypes.func,
  onCompareDayChange: PropTypes.func.isRequired,
  showCompareDay: PropTypes.bool.isRequired,
  showHour: PropTypes.bool.isRequired,
}
ByHour.defaultProps = {
  day: new Date(2015,4,1),
  start: 0,
  end: 23,
  showCompareDay: false,
  showHour: false,
}

export default ByHour

//&nbsp;&nbsp;&nbsp;&nbsp;
//<Select defaultValue={this.props.start + '时'} style={{ width: 80, marginRight: '10px' }}
//        onChange={(e) => this.onStartChange(e)}>
//  {
//    this.getStartArr().map((value,index) =>
//      <Option key={index} value={value}>{value}时</Option>
//    )
//  }
//</Select>
//<label>至&nbsp;&nbsp;&nbsp;</label>
//<Select defaultValue={this.props.end + '时'} style={{ width: 80, marginRight: '10px' }}
//        onChange={(e) => this.onEndChange(e)}>
//  {
//    this.getEndArr().map((value,index) =>
//      <Option key={index} value={value}>{value}时</Option>
//    )
//  }
//</Select>

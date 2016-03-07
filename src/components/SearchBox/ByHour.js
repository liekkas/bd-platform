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

class ByHour extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      day: props.day,
      start: props.start,
      end: props.end,
    }
  }

  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
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

  onChange(field, value) {
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  }

  render() {
    const { day, start, end } = this.state
    return (
      <div>
        <DatePicker disabledDate={(v) => this.disabledStartDate(v)}
                    value={this.state.day}
                    placeholder="选择日期"
                    onChange={(v) => this.onChange('day',v)} />
        <Select defaultValue={this.props.start + '时'} style={{ width: 80, marginRight: '10px' }}
                onChange={(e) => this.onStartChange(e)}>
          {
            this.getStartArr().map((value,index) =>
              <Option key={index} value={value}>{value}时</Option>
            )
          }
        </Select>
        <label>至&nbsp;&nbsp;&nbsp;</label>
        <Select defaultValue={this.props.end + '时'} style={{ width: 80, marginRight: '10px' }}
                onChange={(e) => this.onEndChange(e)}>
          {
            this.getEndArr().map((value,index) =>
              <Option key={index} value={value}>{value}时</Option>
            )
          }
        </Select>
        &nbsp;&nbsp;
        <Button type="primary" onClick={() =>
          this.props.onSearch(
            dateFormat(day,'yyyymmdd') + '-' + start,
            dateFormat(day,'yyyymmdd') + '-' + end)}>
          <Icon type="search" />
          查询
        </Button>
      </div>
    )
  }
}

ByHour.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  day: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
}
ByHour.defaultProps = {
  day: new Date(2015,4,1),
  start: 0,
  end: 23,
}

export default ByHour

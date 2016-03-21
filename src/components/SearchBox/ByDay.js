/**
 * Created by liekkas on 16/3/5.
 */
import React, { PropTypes } from 'react'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import _ from 'lodash'
import DatePicker from 'antd/lib/date-picker'
import dateFormat from 'dateFormat'

class ByDay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startValue: props.start,
      endValue: props.end,
    }
  }

  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return (startValue.getTime() >= this.state.endValue.getTime()
      || startValue.getTime() < new Date(2015,4,1).getTime())
  }

  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return (endValue.getTime() <= this.state.startValue.getTime()
      || endValue.getTime() >= new Date(2015,10,1).getTime())
  }

  onStartChange(v) {
    this.setState({startValue: v})
    this.props.onStartChange(dateFormat(v,'yyyymmdd'))
  }

  onEndChange(v) {
    this.setState({endValue: v})
    this.props.onEndChange(dateFormat(v,'yyyymmdd'))
  }

  render() {
    const { startValue, endValue } = this.state
    return (
      <div>
        {
          this.props.rangeMode
            ? <div>
                <DatePicker disabledDate={(v) => this.disabledStartDate(v)}
                            value={startValue}
                            placeholder="开始日期"
                            onChange={(v) => this.onStartChange(v)} />
                <label>&nbsp;&nbsp;至&nbsp;&nbsp;</label>
                <DatePicker disabledDate={(v) => this.disabledEndDate(v)}
                            value={endValue}
                            placeholder="结束日期"
                            onChange={(v) => this.onEndChange(v)} />
              </div>
            : <DatePicker disabledDate={(v) => this.disabledStartDate(v)}
                          value={startValue}
                          placeholder="开始日期"
                          onChange={(v) => this.onStartChange(v)} />
        }

      </div>
    )
  }
}

ByDay.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  rangeMode: PropTypes.bool.isRequired,
}
ByDay.defaultProps = {
  start: new Date(2015,4,1),
  end: new Date(2015,9,31),
  rangeMode: true
}

export default ByDay

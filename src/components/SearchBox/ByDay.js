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
    return startValue.getTime() >= this.state.endValue.getTime();
  }

  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  }

  onChange(field, value) {
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  }

  render() {
    const { startValue, endValue } = this.state
    return (
      <div>
        <DatePicker disabledDate={(v) => this.disabledStartDate(v)}
                    value={this.state.startValue}
                    placeholder="开始日期"
                    onChange={(v) => this.onChange('startValue',v)} />
        <label>&nbsp;&nbsp;至&nbsp;&nbsp;</label>
        <DatePicker disabledDate={(v) => this.disabledEndDate(v)}
                    value={this.state.endValue}
                    placeholder="结束日期"
                    onChange={(v) => this.onChange('endValue',v)} />
        &nbsp;&nbsp;
        <Button type="primary" onClick={() =>
          this.props.onSearch(dateFormat(startValue,'yyyymmdd'),dateFormat(endValue,'yyyymmdd'))}>
          <Icon type="search" />
          查询
        </Button>
      </div>
    )
  }
}

ByDay.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
}
ByDay.defaultProps = {
  start: new Date(2015,4,1),
  end: new Date(2015,9,31),
}

export default ByDay

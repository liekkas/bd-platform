/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'
import ByChannel from './ByChannel'
import ByWeek from './ByWeek'
import ByDay from './ByDay'
import ByHour from './ByHour'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const Option = Select.Option
import style from './style.scss'

const channels = [
  'CCTV-1',
  'CCTV-2',
  'CCTV-3',
]

class ShowsOrderSearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateType: props.dateType,
      categoryType: props.categoryType,
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
    this.setState({dateType: value})
  }

  handleCategoryTypeChange(value) {
    this.setState({categoryType: value})
  }

  renderCondition() {
    switch (this.state.categoryType) {
      case 'byChannel':
        return <ByChannel onSearch={(channelName) => this.props.onSearch('byChannel',channelName)}/>
      case 'byTime':
        return <ByHour onSearch={(start,end) => this.props.onSearch('T',start,end)}/>
    }
  }

  render() {
    const { showTime } = this.props
    return (
      <div className={style.root}>
        <Select defaultValue={this.props.categoryType} style={{ width: 110, marginRight: '10px' }}
                onChange={(e) => this.handleCategoryTypeChange(e)}>
          <Option value="byChannel">按频道</Option>
          <Option value="byTime">按播出时段</Option>
          <Option value="byShow">按节目</Option>
        </Select>

        { this.renderCondition() }

        <Select showSearch defaultValue={this.props.channelName}
                style={{ width: 200 }}
                placeholder="请选择频道"
                optionFilterProp="children"
                notFoundContent="无法找到"
                searchPlaceholder="输入关键词"
                onChange={(v) => this.handleChange(v)}>
          {
            channels.map((name, index) =>
              <Option value={name} key={index}>{name}</Option>
            )
          }
        </Select>

      </div>
    )
  }
}

ShowsOrderSearchBox.propTypes = {
  dateType: PropTypes.string.isRequired,
  categoryType: PropTypes.string.isRequired,
  showTime: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
}
ShowsOrderSearchBox.defaultProps = {
  dateType: 'D',
  categoryType: 'byChannel',
  showTime: false,
}

export default ShowsOrderSearchBox

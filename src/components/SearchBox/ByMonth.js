/**
 * Created by liekkas on 16/3/5.
 */
import React, { PropTypes } from 'react'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const Option = Select.Option
import _ from 'lodash'
import dateFormat from 'dateFormat'

class ByMonth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: props.start,
      end: props.end,
    }
  }

  onStartChange(v) {
    this.setState({start: v})
    this.props.onStartChange(dateFormat(new Date(2015,v - 1),'yyyymm'))
  }

  onEndChange(v) {
    this.setState({end: v})
    this.props.onEndChange(dateFormat(new Date(2015,v - 1),'yyyymm'))
  }

  getStartArr() {
    return _.range(this.props.start,this.state.end + 1)
  }

  getEndArr() {
    return _.range(this.state.start,this.props.end + 1)
  }

  render() {
    const { start, end } = this.state
    return (
      <div>
        <Select defaultValue={'2015年' + this.props.start + '月'} style={{ width: 100, marginRight: '10px' }}
                onChange={(e) => this.onStartChange(e)}>
          {
            this.getStartArr().map((value,index) =>
              <Option key={index} value={value}>2015年{value}月</Option>
            )
          }
        </Select>
        <label>至&nbsp;&nbsp;&nbsp;</label>
        <Select defaultValue={'2015年' + this.props.end + '月'} style={{ width: 100, marginRight: '10px' }}
                onChange={(e) => this.onEndChange(e)}>
          {
            this.getEndArr().map((value,index) =>
              <Option key={index} value={value}>2015年{value}月</Option>
            )
          }
        </Select>
      </div>
    )
  }
}

ByMonth.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
}
ByMonth.defaultProps = {
  start: 5,
  end: 10,
}

export default ByMonth

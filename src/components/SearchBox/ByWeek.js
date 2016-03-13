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

class ByWeek extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: props.start,
      end: props.end,
    }
  }

  onStartChange(v) {
    this.setState({start: v})
    this.props.onStartChange('2015' + v)
  }

  onEndChange(v) {
    this.setState({end: v})
    this.props.onEndChange('2015' + v)
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
        {
          this.props.rangeMode
            ? <div>
                <Select defaultValue={'2015年第' + this.props.start + '周'} style={{ width: 135, marginRight: '10px' }}
                        onChange={(e) => this.onStartChange(e)}>
                  {
                    this.getStartArr().map((value, index) =>
                      <Option key={index} value={value}>2015年第{value}周</Option>
                    )
                  }
                </Select>
                <label>至&nbsp;&nbsp;&nbsp;</label>
                <Select defaultValue={'2015年第' + this.props.end + '周'} style={{ width: 135, marginRight: '10px' }}
                        onChange={(e) => this.onEndChange(e)}>
                  {
                    this.getEndArr().map((value, index) =>
                      <Option key={index} value={value}>2015年第{value}周</Option>
                    )
                  }
                </Select>
              </div>
            : <Select defaultValue={'2015年第' + this.props.start + '周'} style={{ width: 135, marginRight: '10px' }}
                      onChange={(e) => this.onStartChange(e)}>
                {
                  this.getStartArr().map((value, index) =>
                    <Option key={index} value={value}>2015年第{value}周</Option>
                  )
                }
              </Select>
        }
      </div>
    )
  }
}

ByWeek.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  onSearch: PropTypes.func,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
  rangeMode: PropTypes.bool.isRequired,
}
ByWeek.defaultProps = {
  start: 18,
  end: 44,
  rangeMode: true
}

export default ByWeek

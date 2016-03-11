/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import _ from 'lodash'
import DatePicker from 'antd/lib/date-picker'
import dateFormat from 'dateFormat'
import Select from 'antd/lib/select'
const Option = Select.Option

const datas = ['TOP10','TOP20','TOP50']
class ByChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelName: props.channelName,
    }
  }

  handleChange(value) {
    this.setState({channelName: value})
    this.props.onChannelChange(value)
  }

  render() {
    const { foo } = this.props
    return (
      <div>
        <Select defaultValue={this.props.channelName}
                style={{ width: 120 }}
                placeholder="请选择频道"
                notFoundContent="无法找到"
                searchPlaceholder="输入关键词"
                onChange={(v) => this.handleChange(v)}>
          {
            datas.map((name, index) =>
              <Option value={name} key={index}>{name}</Option>
            )
          }
        </Select>
      </div>
    )
  }
}

ByChannel.propTypes = {
  channelName: PropTypes.string.isRequired,
  onChannelChange: PropTypes.func.isRequired,
}
ByChannel.defaultProps = {
  channelName: 'CCTV-1',
}

export default ByChannel

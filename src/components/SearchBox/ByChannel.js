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

const channels = [
  'CCTV-1',
  'CCTV-2',
  'CCTV-3',
]

class ByChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelName: props.channelName,
    }
  }

  handleChange(value) {
    this.setState({channelName: value})
  }

  render() {
    const { foo } = this.props
    return (
      <div>
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

        &nbsp;&nbsp;
        <Button type="primary" onClick={() =>
          this.props.onSearch()}>
          <Icon type="search" />
          查询
        </Button>
      </div>
    )
  }
}

ByChannel.propTypes = {
  channelName: PropTypes.string.isRequired,
}
ByChannel.defaultProps = {
  channelName: 'CCTV-1',
}

export default ByChannel

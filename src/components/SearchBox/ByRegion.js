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

const datas = ['全部','江苏省','湖北省','安徽省','湖南省','河北省','山东省','河南省']
class ByRegion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regionName: props.regionName,
    }
  }

  handleChange(value) {
    this.setState({regionName: value})
    this.props.onRegionChange(value)
  }

  render() {
    const { foo } = this.props
    return (
      <div>
        <Select defaultValue={this.props.regionName}
                style={{ width: 120 }}
                placeholder="请选择地区"
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

ByRegion.propTypes = {
  regionName: PropTypes.string.isRequired,
  onRegionChange: PropTypes.func.isRequired,
}
ByRegion.defaultProps = {
  regionName: '全部',
}

export default ByRegion

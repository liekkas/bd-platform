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

const channels = ['CCTV-1', 'CCTV-1高清', 'CCTV-2', 'CCTV-2高清', 'CCTV-3', 'CCTV-3高清', 'CCTV-4', 'CCTV-5', 'CCTV-5高清', 'CCTV-6', 'CCTV-6高清', 'CCTV-7', 'CCTV-7高清', 'CCTV-8', 'CCTV-8高清', 'CCTV-9', 'CCTV-9高清', 'CCTV-10', 'CCTV-10高清', 'CCTV-11', 'CCTV-12', 'CCTV-12高清', 'CCTV-NEWS', 'CCTV-少儿', 'CCTV-少儿高清', 'CCTV-新闻', 'CCTV-音乐', 'CETV-1', '上海炫动卡通', '上海纪实', '上海纪实高清', '世界地理', '东方卫视', '东方卫视高清', '东方财经', '云南卫视', '优漫卡通', '兵团卫视', '内蒙古卫视', '凤凰卫视', '劲爆体育', '劲爆体育HD', '北京卫视', '北京卫视高清', '北京纪实', '北京纪实高清', '卡酷少儿', '发现之旅', '吉林卫视', '四川卫视', '国防军事', '天津卫视', '天津卫视高清', '宁夏卫视', '安徽卫视', '安徽卫视高清', '山东卫视', '山东卫视高清', '广东卫视', '广东卫视高清', '广西卫视', '新疆卫视', '新科动漫', '旅游卫视', '江苏卫视', '江苏卫视高清', '江西卫视', '河北卫视', '河南卫视', '浙江卫视', '浙江卫视高清', '深圳卫视', '深圳卫视高清', '湖北卫视', '湖北卫视高清', '湖南卫视', '湖南卫视高清', '甘肃卫视', '电视指南', '福建卫视', '第一剧场', '西藏卫视', '贵州卫视', '辽宁卫视', '辽宁卫视高清', '重庆卫视', '陕西卫视', '青海卫视', '风云足球', '风云音乐', '风尚购物', '高尔夫', '高清探索', '黑龙江卫视', '黑龙江卫视高清',]

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
        <Select showSearch defaultValue={this.props.channelName}
                style={{ width: 130 }}
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

ByChannel.propTypes = {
  channelName: PropTypes.string.isRequired,
  onChannelChange: PropTypes.func.isRequired,
}
ByChannel.defaultProps = {
  channelName: 'CCTV-1',
}

export default ByChannel

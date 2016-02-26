/**
 * Created by liekkas on 16/2/19.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../../components'
import style from './style.scss'
import { connect } from 'react-redux'

const datas = [
  { name: '直播用户分析', key: 'liveBroadcast' },
  { name: '直播频道组分析', key: 'liveBroadcast/channelGroupAnalysis' },
  { name: '直播频道排名', key: 'liveBroadcast/channelOrder' },
  { name: '直播频道分析', key: 'liveBroadcast/channelAnalysis' },
  { name: '直播节目排名', key: 'liveBroadcast/showsOrder' },
]

class LiveBroadcast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  render() {
    const { route } = this.props
    return (
      <div className={style.root}>
        <SideNav datas={datas} route={route}/>
        {this.props.children}
      </div>
    )
  }
}

LiveBroadcast.propTypes = {
  foo: PropTypes.string.isRequired,
}
LiveBroadcast.defaultProps = {
  foo: 'LiveBroadcast',
}

function select(state) {
  return {
    route: state.getIn(['global', 'route']),
  };
}

export default connect(select)(LiveBroadcast)

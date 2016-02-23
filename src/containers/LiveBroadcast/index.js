/**
 * Created by liekkas on 16/2/19.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../../components'
import style from './style.scss'
import { connect } from 'react-redux'

const datas = [
  { name: '总体分析', key: 'liveBroadcast' },
  { name: 'Channel分析', key: 'liveBroadcast/channelAnalysis' },
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

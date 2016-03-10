/**
 * Created by liekkas on 16/2/26.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../../components'
import style from './style.scss'
import { connect } from 'react-redux'

class LiveBroadcast extends React.Component {
  render() {
    const { route } = this.props
    return (
      <div className={style.root}>
        <SideNav type="1" route={route} />
        {this.props.children}
      </div>
    )
  }
}

LiveBroadcast.propTypes = {
  foo: PropTypes.string.isRequired,
}
LiveBroadcast.defaultProps = {
  foo: 'bar',
}

function select(state) {
  return {
    route: state.getIn(['global', 'route']),
//    route: state.global.route,
  };
}

export default connect(select)(LiveBroadcast)

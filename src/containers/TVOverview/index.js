/**
 * Created by liekkas on 16/2/26.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../../components'
import style from './style.scss'
import { connect } from 'react-redux'
import { UPDATE_LOCATION } from 'react-router-redux'

const datas = [
  { name: '用户概况', key: 'tvOverview',
    subMenus: [
      { name: '用户概况', key: 'liveBroadcast' },
      { name: '用户行为', key: 'liveBroadcast/userBehave' },
    ]
  },
  { name: '用户行为', key: 'tvOverview/userBehave', subMenus: [] },
  { name: '全业务概况', key: 'tvOverview/businessOverview', subMenus: [] },
]

class TVOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  onNav(e) {
    console.log(e)
    this.props.dispatch({
      type: '@@router/UPDATE_LOCATION',
      payload: {
        pathname: '/' + e,
        action: 'PUSH',
        key: '45dew5'
      }
    });
  }

  render() {
    const { route } = this.props
    return (
      <div className={style.root}>
        <SideNav type="0" datas={datas} route={route} onNav={(e) => this.onNav(e)}/>
        {this.props.children}
      </div>
    )
  }
}

TVOverview.propTypes = {
  foo: PropTypes.string.isRequired,
}
TVOverview.defaultProps = {
  foo: 'bar',
}

function select(state) {
  return {
    route: state.getIn(['global', 'route']),
//    route: state.global.route,
  };
}

export default connect(select)(TVOverview)

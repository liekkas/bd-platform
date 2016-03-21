/**
 * Created by liekkas on 16/2/26.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../../components'
import style from './style.scss'
import { connect } from 'react-redux'

const datas = [
  { name: '点播用户分析', key: 'demandBroadcast' },
  { name: '媒资概况分析', key: 'demandBroadcast/mediaAssetsOverview' },
  { name: '节目类型分析', key: 'demandBroadcast/showsTypeAnalysis' },
  { name: '节目排名分析', key: 'demandBroadcast/showsOrderAnalysis' },
]

class DemandBroadcast extends React.Component {
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
        <SideNav type="2" datas={datas} route={route}/>
        {this.props.children}
      </div>
    )
  }
}

DemandBroadcast.propTypes = {
  foo: PropTypes.string.isRequired,
}
DemandBroadcast.defaultProps = {
  foo: 'bar',
}

function select(state) {
  return {
    route: state.getIn(['global', 'route']),
  };
}

export default connect(select)(DemandBroadcast)

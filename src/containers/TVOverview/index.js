/**
 * Created by liekkas on 16/2/26.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../../components'
import style from './style.scss'
import { connect } from 'react-redux'

const datas = [
  { name: '用户概况', key: 'tvOverview' },
  { name: '用户行为', key: 'tvOverview/userBehave' },
  { name: '全业务概况', key: 'tvOverview/businessOverview' },
]

class TVOverview extends React.Component {
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

TVOverview.propTypes = {
  foo: PropTypes.string.isRequired,
}
TVOverview.defaultProps = {
  foo: 'bar',
}

function select(state) {
  return {
    route: state.getIn(['global', 'route']),
  };
}

export default connect(select)(TVOverview)

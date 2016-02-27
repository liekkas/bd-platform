/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import style from './style.scss'
import dsplogo from './dsplogo.png'

const datas = [
  { name: '首页', key: 'home' },
//  { name: '概况监控', key: 'tvOverview' },
//  { name: '场景监控', key: 'liveBroadcast' },
//  { name: '拓扑监控', key: 'demandBroadcast' },
  { name: '电视概况', key: 'tvOverview' },
  { name: '直播业务', key: 'liveBroadcast' },
  { name: '点播业务', key: 'demandBroadcast' },
]

class Header extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <img src={dsplogo} />
        <ui className={style.menu}>
          {
            datas.map(({name, key}, index) =>
              <li key={index} className={ this.props.route.indexOf(key) > -1 ? style.active : null }>
                {
                  key === 'home'
                  ? <IndexLink to="/">{name}</IndexLink>
                  : <Link to={'/' + key}>{name}</Link>
                }
              </li>
            )
          }
        </ui>
      </div>
    )
  }
}

Header.propTypes = {
  route: PropTypes.string.isRequired,
}

export default Header

/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import style from './style.scss'
import dsplogo from './dsplogo.png'

const datas = [
  { name: '首页', key: 'home' },
  { name: '场景管理', key: 'liveBroadcast' },
  { name: '资源管理', key: 'gameProduct' },
  { name: '拓扑监控', key: 'eduProduct' },
  { name: '性能管理', key: 'otherApp' },
  { name: '关于', key: 'advert' },
]

class Header extends React.Component {
  render() {
    return (
      <div className={style.root}>
        <img src={dsplogo} />
        <ui className={style.menu}>
          {
            datas.map(({name, key}, index) =>
              <li key={index} className={ this.props.route === key ? style.active : null }>
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

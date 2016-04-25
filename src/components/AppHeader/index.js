import React, { PropTypes } from 'react'
import { IndexLink, Link ,browserHistory } from 'react-router'
import style from './style.less'
import logo from './logo.png'

const datas = [
  { name: '首页', key: 'home', reg: 'home' },
  { name: '电视概况', key: 'tvUserOverview', reg: 'tv' },
  { name: '直播业务', key: 'lbUserOverview', reg: 'lb' },
  { name: '点播业务', key: 'dbUserOverview', reg: 'db' },
].reverse()

class AppHeader extends React.Component {
  render() {
    const {module} = this.props
//    console.log('>>> AppHeader:module:', module)

    return (
      <div className={style.root}>
        <img src={logo} onClick={() => browserHistory.push('/')} />
        <ui className={style.menu}>
          {
            datas.map(({name, key, reg}, index) =>
              <li key={index} className={
                module.indexOf(reg) > -1 ? style.active : null }>
                {
                  key === 'home'
                    ? <IndexLink to='/'>{name}</IndexLink>
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

AppHeader.propTypes = {
  module: PropTypes.string.isRequired,
}

export default AppHeader

/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import style from './style.scss'
import { Link } from 'react-router'

class SideNav extends React.Component {

  render() {
    const { datas, route } = this.props
    console.log('>>> route', route)

    return (
      <div className={style.root}>
        <ui className={style.menu}>
          {
            datas.map(({name, key}, index) =>
              <li key={index} className={ route === key ? style.active : null }>
                {
                  route === key
                    ? <span className="zmdi zmdi-arrow-right zmdi-hc-lg"
                            style={{
                              position: 'absolute',
                              marginLeft: '6px',
                              marginTop: '16px',
                            }} />
                    : null
                }
                <Link to={'/' + key}>&nbsp;&nbsp;{name}</Link>
              </li>
            )
          }
        </ui>
      </div>
    )
  }
}

SideNav.propTypes = {
  datas: PropTypes.array.isRequired,
  route: PropTypes.string.isRequired,
}

export default SideNav

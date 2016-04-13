/**
 * Created by liekkas on 16/4/8.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../../components'
import styles from '../styles.scss'
import { Menus } from '../../constants/Consts'

const MODULE = Menus.mapping.liveBroadcast.en
const DEFAULT_SUB_MODULE = Menus.mapping.lbUserOverview.en

export default class LiveBroadcast extends React.Component {
  render() {
    return (
      <div className={styles.moduleRoot}>
        <SideNav data={Menus[MODULE]} selectedMenu={DEFAULT_SUB_MODULE} />
        { this.props.children }
      </div>
    )
  }
}

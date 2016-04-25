/**
 * Created by liekkas on 16/4/24.
 */
import React, { PropTypes } from 'react'
import { SideNav } from '../components'
import { Menus } from '../constants/Consts'
import { connect } from 'react-redux'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: '2% 1% 1% 0',
  }
}

class ModuleTemplate extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <SideNav data={Menus[this.props.module]} selectedMenu={this.props.curPath} />
        { this.props.children }
      </div>
    )
  }
}

ModuleTemplate.propTypes = {
  module: PropTypes.string.isRequired
}

export default connect(state => (
  {curPath: state.routing.locationBeforeTransitions.pathname.substring(1)})
)(ModuleTemplate)

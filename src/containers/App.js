/**
 * Created by liekkas on 16/3/31.
 */
import React from 'react'
import { connect } from 'react-redux'
import { AppHeader, AppFooter } from '../components'

const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingTop: '5vh',
  }
}

class App extends React.Component {
  render() {
    const curPath = this.props.curPath === '' ? 'home' : this.props.curPath
    return (
      <div style={styles.root}>
        <AppHeader module={curPath} />
        <div style={styles.content}>
          {this.props.children}
        </div>
        {
          curPath !== 'home'
            ? <AppFooter text='© 2016 All Rights Reserved 中信国安广视网络有限公司 版权所有'/>
            : null
        }
      </div>
    )
  }
}

export default connect(state => (
  {curPath: state.routing.locationBeforeTransitions.pathname.substring(1)})
)(App)

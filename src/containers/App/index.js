/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'
import { Header } from '../../components'
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Header route={this.props.route}/>
        <div style={{width: '100%', height: '100%',paddingTop: '50px'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    route: state.getIn(['global', 'route']),
  };
}

export default connect(select)(App)

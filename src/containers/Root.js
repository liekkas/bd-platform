import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

export default class Root extends React.Component {
  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.route}
      </Router>
    )
  }

  render () {
    return (
      <Provider store={this.props.store}>
        {this.content}
      </Provider>
    )
  }
}

Root.propTypes = {
  route: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

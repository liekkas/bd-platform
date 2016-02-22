/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'
import { Header } from '../../components'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default App

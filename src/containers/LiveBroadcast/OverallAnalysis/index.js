/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import style from './style.scss'

class OverallAnalysis extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default OverallAnalysis

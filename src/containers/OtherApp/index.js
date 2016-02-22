/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'

class OtherApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }
  
  render() {
    const { foo } = this.props
    return (
      <div>
        {foo}
      </div>
    )
  }
}

OtherApp.propTypes = {
  foo: PropTypes.string.isRequired,
}
OtherApp.defaultProps = {
  foo: 'bar',
}

export default OtherApp

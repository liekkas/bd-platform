/**
 * Created by liekkas on 16/2/26.
 */
import React, { PropTypes } from 'react'

class DemandBroadcast extends React.Component {
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

DemandBroadcast.propTypes = {
  foo: PropTypes.string.isRequired,
}
DemandBroadcast.defaultProps = {
  foo: 'bar',
}

export default DemandBroadcast

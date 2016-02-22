/**
 * Created by liekkas on 16/2/19.
 */
import React, { PropTypes } from 'react'

class LiveBroadcast extends React.Component {
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

LiveBroadcast.propTypes = {
  foo: PropTypes.string.isRequired,
}
LiveBroadcast.defaultProps = {
  foo: 'LiveBroadcast',
}

export default LiveBroadcast

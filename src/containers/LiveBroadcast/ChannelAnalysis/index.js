/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'

class ChannelAnalysis extends React.Component {
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
        ChannelAnalysis
      </div>
    )
  }
}

ChannelAnalysis.propTypes = {
  foo: PropTypes.string.isRequired,
}
ChannelAnalysis.defaultProps = {
  foo: 'bar',
}

export default ChannelAnalysis

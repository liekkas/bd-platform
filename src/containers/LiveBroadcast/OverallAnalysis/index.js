/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'

class OverallAnalysis extends React.Component {
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
        OverallAnalysis
      </div>
    )
  }
}

OverallAnalysis.propTypes = {
  foo: PropTypes.string.isRequired,
}
OverallAnalysis.defaultProps = {
  foo: 'bar',
}

export default OverallAnalysis

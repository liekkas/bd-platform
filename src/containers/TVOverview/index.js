/**
 * Created by liekkas on 16/2/26.
 */
import React, { PropTypes } from 'react'

class TVOverview extends React.Component {
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

TVOverview.propTypes = {
  foo: PropTypes.string.isRequired,
}
TVOverview.defaultProps = {
  foo: 'bar',
}

export default TVOverview

/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'

class TVPlayList extends React.Component {
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

TVPlayList.propTypes = {
  foo: PropTypes.string.isRequired,
}
TVPlayList.defaultProps = {
  foo: 'TVPlayList',
}

export default TVPlayList

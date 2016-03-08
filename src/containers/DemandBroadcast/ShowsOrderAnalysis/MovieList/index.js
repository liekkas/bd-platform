/**
 * Created by liekkas on 16/3/7.
 */
import React, { PropTypes } from 'react'

class MovieList extends React.Component {
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

MovieList.propTypes = {
  foo: PropTypes.string.isRequired,
}
MovieList.defaultProps = {
  foo: 'MovieList',
}

export default MovieList

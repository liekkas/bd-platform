/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'

class GameProduct extends React.Component {
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

GameProduct.propTypes = {
  foo: PropTypes.string.isRequired,
}
GameProduct.defaultProps = {
  foo: 'bar',
}

export default GameProduct

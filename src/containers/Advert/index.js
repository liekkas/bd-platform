/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'

class Advert extends React.Component {
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

Advert.propTypes = {
  foo: PropTypes.string.isRequired,
}
Advert.defaultProps = {
  foo: 'bar',
}

export default Advert

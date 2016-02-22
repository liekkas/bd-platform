/**
 * Created by liekkas on 16/2/22.
 */
import React, { PropTypes } from 'react'

class EduProduct extends React.Component {
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

EduProduct.propTypes = {
  foo: PropTypes.string.isRequired,
}
EduProduct.defaultProps = {
  foo: 'bar',
}

export default EduProduct

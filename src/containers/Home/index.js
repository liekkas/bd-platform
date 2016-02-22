/**
 * Created by liekkas on 16/2/19.
 */
import React, { PropTypes } from 'react'
import { ECharts } from '../../components'
import { getInitLineBarChart } from '../../components/ECharts/initOptions'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: 'bar',
    }
  }

  render() {
    const { foo } = this.props
    return (
      <div style={{ width: '100%',height: '90vh' }}>
        <ECharts config={getInitLineBarChart('bar')}/>
      </div>
    )
  }
}

Home.propTypes = {
  foo: PropTypes.string.isRequired,
}
Home.defaultProps = {
  foo: 'Home',
}

export default Home

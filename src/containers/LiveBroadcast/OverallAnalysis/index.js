/**
 * Created by liekkas on 16/2/23.
 */
import React, { PropTypes } from 'react'
import { Panel, ECharts } from '../../../components'
import style from './style.scss'

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
      <div className={style.root}>
        <Panel title="筛选条件" height="300px">
          <ECharts config={{type: 'pie',mode: 'local',}}/>
        </Panel>
        <Panel title="总体分析" height="300px">
          <ECharts config={{type: 'bar',mode: 'local',}}/>
        </Panel>
        <Panel title="总体分析2" height="300px">
          <ECharts config={{type: 'bar',mode: 'local',}}/>
        </Panel>
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

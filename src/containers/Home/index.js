/**
 * Created by liekkas on 16/2/19.
 */
import React, { PropTypes } from 'react'
import { ECharts, Panel } from '../../components'
import style from './style.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapType: 'china',
    }
  }

  onMapClick(e) {
    console.log('>>> 我靠',e)
  }

  render() {
    const { foo } = this.props
    return (
      <div className={style.root}>
        <Panel title="全国故障投诉情况" height="300">
          <ECharts config={{type: 'map', mode: 'local', eventType: 'click', eventHandler: this.onMapClick, mapType: 'china'}}/>
        </Panel>

        <div className={style.hgroup}>
          <Panel title="工单投诉" height="300">
            <ECharts config={{type: 'bar',mode: 'local',}}/>
          </Panel>
          <Panel title="故障申报" height="300" style={{ marginRight: 0 }}>
            <ECharts config={{type: 'bar',mode: 'local',}}/>
          </Panel>
        </div>

        <div className={style.hgroup}>
          <Panel title="工单投诉" height="300">
            <ECharts config={{type: 'pie',mode: 'local',}}/>
          </Panel>
          <Panel title="故障申报" height="300" style={{ marginRight: 0 }}>
            <ECharts config={{type: 'line',mode: 'local',}}/>
          </Panel>
        </div>
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

/**
 * Created by liekkas on 16/4/5.
 */
import React, {PropTypes} from 'react'
import echarts from 'echarts'
import ECharts from 're-echarts'
import { mockBarData, mockMapData } from '../../tools/mockData'
import china from './china.json'
import myMap from './myMap.json'
import style from './style.css'
import {browserHistory} from 'react-router'

echarts.registerMap('china', china)
echarts.registerMap('myMap', myMap)

const provinces = ['江苏','湖北','安徽','湖南','河北','山东','河南']

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.onMapClicked = this.onMapClicked.bind(this)
    this.state = {
      mapOption: mockMapData(),
      barOption: mockBarData(),
      mapConfig: {
        event: [{ type: 'click', handler: this.onMapClicked }],
      },
    }
  }

  onMapClicked(item) {
    if (provinces.indexOf(item.name) > -1) {
      browserHistory.push('/tvUserOverview')
    }
  }

  render() {
    const { mapOption, barOption, mapConfig } = this.state
    return (
      <div className={style.root}>
        <div className={style.bar}>
          <ECharts option={barOption} />
        </div>
        <ECharts option={mapOption} config={mapConfig} />
        <label className={style.footLabel}>© 2016 All Rights Reserved 中信国安广视网络有限公司 版权所有</label>
      </div>
    )
  }
}

export default Home

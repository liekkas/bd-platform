/**
 * Created by liekkas on 16/2/19.
 */
import React, { PropTypes } from 'react'
import echarts from 'echarts'
import { Loader } from 'react-loaders'
import { LOADING_STYLE } from '../../config'
import fetch from 'isomorphic-fetch'
import { parse } from '../../tools/jsonEx'
import { generateOption } from './convertOptions';

import _ from 'lodash'

class ECharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: _.uniqueId(new Date().getMilliseconds() + 'ECharts'),
      remoteLoading: false,
      remoteUrlChanged: false,
      option: {},
    }
  }

  componentWillMount() {
    this._getData(this, this.props)
  }

  componentDidMount() {
    const chart = echarts.init(document.getElementById(this.state.id))
    chart.setOption(_.merge(this.state.option))
  }

  componentWillUnmount() {
    const chart = echarts.init(document.getElementById(this.state.id))
    chart.dispose()
  }

  _getData(bind, props) {
    const { config } = props
    //console.log('>>> PBECharts:_getData:', config)
    //local是同步获取,remote是通过远程api异步获取
    if (config.mode === 'local') {
      this.setState({ option: parse(config.localData), remoteLoading: false })
    } else {
      this.setState({ remoteLoading: true })
      fetch(config.remoteDataUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (result) {
          const convert = _.merge(parse(config.localData),generateOption(result, config.type))
          //console.log('>>> PBECharts:fetch', result, convert)
          bind.setState({ option: convert, remoteLoading: false })
          return result
        })
        .catch(function (ex) {
          console.log(ex)
        })
    }
  }

  render() {
    return (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        <div id={this.state.id} style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute',
          left: '45%',
          top: '45%',
          display: this.state.remoteLoading ? '' : 'none',
        }}>
          <Loader type={LOADING_STYLE} active={true} />
        </div>
      </div>
    )
  }
}

ECharts.propTypes = {
  config: PropTypes.object.isRequired,
}

export default ECharts

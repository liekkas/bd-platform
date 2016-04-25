/**
 * Created by liekkas on 16/3/30.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import makeRoutes from './routes'
import './styles/antd/index.less'
import './styles/common.css'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore()
const route = makeRoutes(store)
const history = syncHistoryWithStore(browserHistory,store)

ReactDOM.render(
  <Root route={route} store={store} history={history} />,
  document.getElementById('root')
)

/**
 * Created by liekkas on 15/12/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { Root } from './containers'
//import './normalize.css'
import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css'
import 'loaders.css/loaders.min.css'
import 'react-bootstrap-table/css/react-bootstrap-table.min.css'
import 'react-bootstrap-table/css/toastr.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './common.scss'
//import 'antd/lib/index.css'
import '../vender/antd/index.less'
import configureStore from './configureStore'
import { useRouterHistory, browserHistory, hashHistory } from 'react-router'
import { createHashHistory,createBrowserHistory } from 'history'

import fetch from 'isomorphic-fetch'
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

//import { createAction, ActionTypes } from './actions'

//const store = configureStore()
//const historyConfig = { basename: __BASENAME__ }
//const history = useRouterHistory(createBrowserHistory)(historyConfig)
//const history = createHashHistory()

//const browserHistory = useRouterHistory(createBrowserHistory)({ basename: 'foo' })

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)

//ReactDOM.render(
//  <Root history={browserHistory} route={AppRouter} store={store} />,
//  document.getElementById('root')
//)

setTimeout(function () {
  ReactDOM.render(
    <Root history={browserHistory} route={AppRouter} store={store} />,
    document.getElementById('root')
  )
},100)


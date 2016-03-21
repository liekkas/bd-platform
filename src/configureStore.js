/**
 * Created by liekkas on 15/12/17.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'history'
import rootReducer from './reducers'
import { Map } from 'immutable'

const finalCreateStore = compose(
  require('./containers/DevTools').default.instrument()
)(createStore)

export default function configureStore (initialState = {}, history) {
  const routerMiddleware = syncHistory(history)
  let middleware = applyMiddleware(thunk, routerMiddleware)
//  let middleware = applyMiddleware(routerMiddleware(browserHistory))

  const store = __DEV__
    ? middleware(finalCreateStore)(rootReducer, Map(initialState))
    : middleware(createStore)(rootReducer, Map(initialState))
//    ? finalCreateStore(rootReducer, middleware)
//    : createStore(rootReducer, middleware)

//  routerMiddleware.listenForReplays(store, ({ router }) => router.location)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}


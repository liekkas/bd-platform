/**
 * Created by liekkas on 15/12/17.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import { Map } from 'immutable'

const finalCreateStore = compose(
  require('./containers/DevTools').default.instrument()
)(createStore)

export default function configureStore (initialState = {}) {
  const store = __DEV__
    ? finalCreateStore(rootReducer, Map(initialState))
    : createStore(rootReducer)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}


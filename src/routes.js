import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Home, LiveBroadcast } from './containers'
import { NotFound, About } from './components'

const App = (props) => <div>{props.children}</div>

const AppRouter = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="liveBroadcast" component={LiveBroadcast} />
    <Route path="about" component={About} />
    <Route path="*" component={NotFound} status={404}/>
  </Route>
);

export default AppRouter;

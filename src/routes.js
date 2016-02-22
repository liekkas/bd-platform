import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, Home, LiveBroadcast, GameProduct, EduProduct, Advert, OtherApp } from './containers'
import { NotFound, About } from './components'

const AppRouter = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="liveBroadcast" component={LiveBroadcast} />
    <Route path="gameProduct" component={GameProduct} />
    <Route path="eduProduct" component={EduProduct} />
    <Route path="otherApp" component={OtherApp} />
    <Route path="advert" component={Advert} />
    <Route path="*" component={NotFound} status={404}/>
  </Route>
);

export default AppRouter;

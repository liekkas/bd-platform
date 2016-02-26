import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, Home, TVOverview, LiveBroadcast, DemandBroadcast,
  OverallAnalysis, ChannelAnalysis } from './containers'
import { NotFound, About } from './components'

const AppRouter = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="tvOverview" component={TVOverview} />
    <Route path="liveBroadcast" component={LiveBroadcast}>
      <IndexRoute component={OverallAnalysis} />
      <Route path="/liveBroadcast/channelAnalysis" component={ChannelAnalysis} />
    </Route>
    <Route path="demandBroadcast" component={DemandBroadcast} />
    <Route path="*" component={NotFound} status={404}/>
  </Route>
);

export default AppRouter;

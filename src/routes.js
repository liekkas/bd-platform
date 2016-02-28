import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, Home, TVOverview, LiveBroadcast, DemandBroadcast,
  UserOverview, UserBehave, BusinessOverview,
  DemandUserAnalysis, MediaAssetsOverview, ShowsTypeAnalysis, ShowsOrderAnalysis,
  OverallAnalysis, ChannelAnalysis, ChannelGroupAnalysis, ChannelOrder, ShowsOrder } from './containers'
import { NotFound, About } from './components'

const AppRouter = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="tvOverview" component={TVOverview}>
      <IndexRoute component={UserOverview} />
      <Route path="/tvOverview/userBehave" component={UserBehave} />
      <Route path="/tvOverview/businessOverview" component={BusinessOverview} />
    </Route>
    <Route path="liveBroadcast" component={NotFound}>
      <IndexRoute component={OverallAnalysis} />
      <Route path="/liveBroadcast/channelGroupAnalysis" component={ChannelGroupAnalysis} />
      <Route path="/liveBroadcast/channelOrder" component={ChannelOrder} />
      <Route path="/liveBroadcast/channelAnalysis" component={ChannelAnalysis} />
      <Route path="/liveBroadcast/showsOrder" component={ShowsOrder} />
    </Route>
    <Route path="demandBroadcast" component={NotFound}>
      <IndexRoute component={DemandUserAnalysis} />
      <Route path="/demandBroadcast/mediaAssetsOverview" component={MediaAssetsOverview} />
      <Route path="/demandBroadcast/showsTypeAnalysis" component={ShowsTypeAnalysis} />
      <Route path="/demandBroadcast/showsOrderAnalysis" component={ShowsOrderAnalysis} />
    </Route>
    <Route path="*" component={NotFound} status={404}/>
  </Route>
);

export default AppRouter;

//<Route path="/" component={App}>
//  <IndexRoute component={Home} />
//  <Route path="tvOverview" component={TVOverview}>
//    <IndexRoute component={UserOverview} />
//    <Route path="/tvOverview/userBehave" component={UserBehave} />
//    <Route path="/tvOverview/businessOverview" component={BusinessOverview} />
//  </Route>
//  <Route path="liveBroadcast" component={LiveBroadcast}>
//    <IndexRoute component={OverallAnalysis} />
//    <Route path="/liveBroadcast/channelGroupAnalysis" component={ChannelGroupAnalysis} />
//    <Route path="/liveBroadcast/channelOrder" component={ChannelOrder} />
//    <Route path="/liveBroadcast/channelAnalysis" component={ChannelAnalysis} />
//    <Route path="/liveBroadcast/showsOrder" component={ShowsOrder} />
//  </Route>
//  <Route path="demandBroadcast" component={DemandBroadcast}>
//    <IndexRoute component={DemandUserAnalysis} />
//    <Route path="/demandBroadcast/mediaAssetsOverview" component={MediaAssetsOverview} />
//    <Route path="/demandBroadcast/showsTypeAnalysis" component={ShowsTypeAnalysis} />
//    <Route path="/demandBroadcast/showsOrderAnalysis" component={ShowsOrderAnalysis} />
//  </Route>
//  <Route path="*" component={NotFound} status={404}/>
//</Route>

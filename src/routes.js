import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'
import { App, Home, TVOverview, LiveBroadcast, DemandBroadcast,
  UserOverview, UserBehave, BusinessOverview, DemandUserOverview, DemandUserBehave,
  DemandUserAnalysis, MediaAssetsOverview, ResUtilizationAnalysis, ShowCenterAnalysis,
  ShowsTypeAnalysis, ShowsUserAnalysis, ShowsTimeUseAnalysis, ShowsOrderAnalysis,
  MovieList, TVPlayList,
  OverallAnalysis, OverallAnalysisUserOverview, OverallAnalysisUserBehave,
  ChannelAnalysis, ChannelGroupAnalysis, GroupUserAnalysis, GroupTimeUseAnalysis, ChannelOrder, ShowsOrder } from './containers'
import { NotFound, About } from './components'

const AppRouter = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="tvOverview" component={TVOverview}>
      <IndexRoute component={UserOverview} />
      <Route path="/tvOverview/userBehave" component={UserBehave} />
      <Route path="/tvOverview/businessOverview" component={BusinessOverview} />
    </Route>
    <Route path="liveBroadcast" component={LiveBroadcast}>
      <IndexRoute component={OverallAnalysisUserOverview} />
      <Route path="/liveBroadcast/userBehave" component={OverallAnalysisUserBehave} />
      <Route path="/liveBroadcast/channelGroupUserAnalysis" component={GroupUserAnalysis} />
      <Route path="/liveBroadcast/channelGroupTimeUseAnalysis" component={GroupTimeUseAnalysis} />
      <Route path="/liveBroadcast/channelOrder" component={ChannelOrder} />
      <Route path="/liveBroadcast/channelAnalysis" component={ChannelAnalysis} />
      <Route path="/liveBroadcast/showsOrder" component={ShowsOrder} />
    </Route>
    <Route path="demandBroadcast" component={DemandBroadcast}>
      <IndexRoute component={DemandUserOverview} />
      <Route path="/demandBroadcast/userBehave" component={DemandUserBehave} />

      <Route path="/demandBroadcast/mediaAssetsOverview" component={ResUtilizationAnalysis} />
      <Route path="/demandBroadcast/mediaAssetsOverview/showCenterAnalysis" component={ShowCenterAnalysis} />

      <Route path="/demandBroadcast/showsUserAnalysis" component={ShowsUserAnalysis} />
      <Route path="/demandBroadcast/showsUseTimeAnalysis" component={ShowsTimeUseAnalysis} />

      <Route path="/demandBroadcast/showsOrderAnalysis" component={MovieList} />
      <Route path="/demandBroadcast/showsOrderAnalysis/tvPlayList" component={TVPlayList} />
    </Route>
    <Route path="*" component={Home} status={404}/>
  </Route>
);

export default AppRouter;

//    <Redirect from="*" to="/" />

//<Route path="*" component={Home} status={404}/>

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
//
//<Route path="/liveBroadcast" component={OverallAnalysis}>
//  <IndexRoute component={OverallAnalysisUserOverview} />
//  <Route path="/liveBroadcast/userBehave" component={OverallAnalysisUserBehave} />
//</Route>

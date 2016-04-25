/**
 * Created by liekkas on 16/4/5.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../containers/App'
import Home from '../modules/Home'
import NotFound from '../modules/NotFound'
import * as MODULES from '../modules'

export default () => (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path="/tvOverview" component={MODULES.TVOverview}>
      <IndexRoute component={MODULES.TVUserOverview}/>
      <Route path='/tvUserOverview' component={MODULES.TVUserOverview}/>
      <Route path='/tvUserBehave' component={MODULES.TVUserBehave}/>
      <Route path='/tvBusinessOverview' component={MODULES.TVBusinessOverview}/>
    </Route>
    <Route path="/liveBroadcast" component={MODULES.LiveBroadcast}>
      <IndexRoute component={MODULES.LBUserOverview}/>
      <Route path='/lbUserOverview' component={MODULES.LBUserOverview}/>
      <Route path='/lbUserBehave' component={MODULES.LBUserBehave}/>
      <Route path='/lbcgUserAna' component={MODULES.LBCGUserAna}/>
      <Route path='/lbcgTimeUseAna' component={MODULES.LBCGTimeUseAna}/>
      <Route path='/lbChannelOrder' component={MODULES.LBChannelOrder}/>
      <Route path='/lbChannelAna' component={MODULES.LBChannelAna}/>
      <Route path='/lbShowsOrder' component={MODULES.LBShowsOrder}/>
    </Route>
    <Route path="/demandBroadcast" component={MODULES.DemandBroadcast}>
      <IndexRoute component={MODULES.DBUserOverview}/>
      <Route path='/dbUserOverview' component={MODULES.DBUserOverview}/>
      <Route path='/dbUserBehave' component={MODULES.DBUserBehave}/>
      <Route path='/dbResAvailAna' component={MODULES.DBResAvailAna}/>
      <Route path='/dbShowCenterAna' component={MODULES.DBShowCenterAna}/>
      <Route path='/dbShowTypeUserAna' component={MODULES.DBShowTypeUserAna}/>
      <Route path='/dbShowTypeTimeUseAna' component={MODULES.DBShowTypeTimeUseAna}/>
      <Route path='/dbMovieOrder' component={MODULES.DBMovieOrder}/>
      <Route path='/dbTVPlayOrder' component={MODULES.DBTVPlayOrder}/>
    </Route>
    <Route path='*' component={Home} status={404}/>
  </Route>
)


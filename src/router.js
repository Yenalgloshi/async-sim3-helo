import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';


export default (
  <Switch>
    <Route exact path='/' component={ Auth } />
    <Route path='/Dashboard' component={ Dashboard } />
    <Route path='/Search' component={ Search } />
    <Route path='/Profile' component={ Profile } />
  </Switch>
)
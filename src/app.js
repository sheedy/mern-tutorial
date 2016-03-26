import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, Redirect} from 'react-router';

import BugList from './components/buglist';
import BugEdit from './components/bugedit';
import NotFound from './components/notfound';

ReactDOM.render(
  <Router history={hashHistory}>  
  <Redirect from="/" to="/bugs"/>
  <Route path="/bugs" component={BugList}/>
  <Route path="/bugs/:id" component={BugEdit}/>
  <Route path="*" component={NotFound}/>
</Router>, document.getElementById('main'));

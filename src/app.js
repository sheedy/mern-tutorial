import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import Redirect from 'react-router/lib/Redirect';

import BugList from './components/buglist';
import BugEdit from './components/bugedit';
import NotFound from './components/notfound';

ReactDOM.render(
  <Router history={browserHistory}>
  <Redirect from="/" to="/bugs"/>
  <Route path="/bugs" component={BugList}/>
  <Route path="/bugs/:id" component={BugEdit}/>
  <Route path="*" component={NotFound}/>
</Router>, document.getElementById('main'));

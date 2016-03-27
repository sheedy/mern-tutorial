import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import Redirect from 'react-router/lib/Redirect';

import BugList from './components/BugList';
import EditBugForm from './components/EditBugForm';
import PageNotFound from './components/PageNotFound';

ReactDOM.render(
  <Router history={browserHistory}>
  <Redirect from="/" to="/bugs" />
  <Route path="/bugs" component={BugList} />
  <Route path="/bugs/:id" component={EditBugForm} />
  <Route path="*" component={PageNotFound} />
</Router>, document.getElementById('main'));

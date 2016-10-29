import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router'

import '../less/app.less';

import { Layout } from './layout';
import { SetupPage } from './setup';
import { StatusPage } from './status';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRedirect to="/status" />
      <Route path="status" component={StatusPage} />
      <Route path="setup" component={SetupPage} />
    </Route>
  </Router>
), document.getElementById('pageWrapper'))
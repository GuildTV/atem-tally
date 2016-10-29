import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import '../less/app.less';

import { Layout } from './layout';
import { Controller } from './controller';
import { SetupPage } from './setup';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Controller} />
      <Route path="status" component={Controller} />
      <Route path="setup" component={SetupPage} />
    </Route>
  </Router>
), document.getElementById('pageWrapper'))
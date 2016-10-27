import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import '../less/app.less';

import { Layout } from './layout';
import { Controller } from './controller';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Controller} />
      <Route path="c" component={Controller} />
    </Route>
  </Router>
), document.getElementById('pageWrapper'))
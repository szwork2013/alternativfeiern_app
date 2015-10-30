import React from 'react';
import ReactDom from 'react-dom';
import {DefaultRoute, NotFoundRoute, Route, IndexRoute} from 'react-router';

import Root from './react/singlepage/root.jsx';

var routes = [
  <Route name="Home" path="/">
    <Route name="Root" path="admin" component={Root} />
  </Route>
];

export default routes;

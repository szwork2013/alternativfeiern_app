import React from 'react'
import ReactDom from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router'

import routes from '../../react_routes.jsx';

ReactDom.render(
  <Router history={createBrowserHistory()} routes={routes} />,
  document.getElementById('app-root')
);

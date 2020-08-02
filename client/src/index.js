import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
//! Data providers
import {MeterProvider} from './features/meterSearch';
// core components
import Admin from 'layouts/Admin.js';
import 'index.css';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <MeterProvider>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/linegraph" />
      </Switch>
    </MeterProvider>
  </Router>,
  document.getElementById('root'),
);

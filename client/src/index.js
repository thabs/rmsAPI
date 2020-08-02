import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
//! Data providers
import {MeterProvider} from './features/meterSearch';
// core components
import Home from './containers/Home';
import 'index.css';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <MeterProvider>
      <Switch>
        <Route path="/rms" component={Home} />
        <Redirect from="/" to="/rms/linegraph" />
      </Switch>
    </MeterProvider>
  </Router>,
  document.getElementById('root'),
);

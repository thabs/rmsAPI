import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
//! Data providers
import {MeterProvider} from './features/meterSearch';
// core components
import Home from './containers/Home';
import 'index.css';
import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

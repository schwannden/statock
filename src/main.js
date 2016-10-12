import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
// redux libraries
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import * as stockActions from './actions/stockActions';
import * as exchangeActions from './actions/exchangeActions';

const store = configureStore();
store.dispatch(stockActions.index()),
store.dispatch(exchangeActions.index()),

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app-container')
);


import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './utils/registerServiceWorker';
import store, { history } from './store';
import App from './App';

import './index.css';

const rootElm = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElm
);

registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { AppContainer } from './containers';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

export const app = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

try {
  ReactDOM.render(app, document.getElementById("root"));
} catch (error) { }

registerServiceWorker();

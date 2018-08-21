import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from './containers';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

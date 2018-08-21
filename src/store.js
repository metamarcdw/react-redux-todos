import { createStore, applyMiddleware } from 'redux';
import { createLogger as logger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

export default createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    promise(),
    logger()
  )
);

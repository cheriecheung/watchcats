import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';
import { createLogger } from 'redux-logger';

export default (preloadedState) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk));

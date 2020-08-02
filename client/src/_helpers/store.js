import { createStore, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers';
//import { createLogger } from 'redux-logger';
//const loggerMiddleware = createLogger();

export default (preloadedState) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk));

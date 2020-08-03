import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { session } from './session';

const rootReducer = combineReducers({
  session,
  authentication,
  registration,
});

export default rootReducer;

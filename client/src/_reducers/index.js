import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { session } from './session';
import { account } from './account';

const rootReducer = combineReducers({
  account,
  session,
  authentication,
  registration,
});

export default rootReducer;

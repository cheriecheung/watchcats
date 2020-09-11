import { combineReducers } from 'redux';

import { account } from './account';
import { authentication } from './authentication';
import { booking } from './booking';
import { chat } from './chat';
import { registration } from './registration';
import { session } from './session';

const rootReducer = combineReducers({
  account,
  authentication,
  booking,
  chat,
  registration,
  session,
});

export default rootReducer;

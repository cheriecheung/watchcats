import { combineReducers } from 'redux';

import { account } from './account';
import { authentication } from './authentication';
import { booking_actions } from './booking_actions';
import { booking_status } from './booking_status';
import { chat } from './chat';
import { payment } from './payment';
import { registration } from './registration';
import { session } from './session';

const rootReducer = combineReducers({
  account,
  authentication,
  booking_actions,
  booking_status,
  chat,
  payment,
  registration,
  session,
});

export default rootReducer;

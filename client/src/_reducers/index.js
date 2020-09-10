import { combineReducers } from 'redux';

import { account } from './account';
import { authentication } from './authentication';
import { bookings } from './bookings';
import { chat } from './bookings';
import { registration } from './registration';
import { session } from './session';

const rootReducer = combineReducers({
  account,
  authentication,
  bookings,
  chat,
  registration,
  session,
});

export default rootReducer;

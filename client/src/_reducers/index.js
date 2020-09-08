import { combineReducers } from 'redux';

import { account } from './account';
import { authentication } from './authentication';
import { bookings } from './bookings';
import { registration } from './registration';
import { session } from './session';

const rootReducer = combineReducers({
  account,
  authentication,
  bookings,
  registration,
  session,
});

export default rootReducer;

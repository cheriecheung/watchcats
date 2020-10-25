import { combineReducers } from 'redux';

import { account } from './account';
import { authentication } from './authentication';
import { booking_actions } from './booking_actions';
import { booking_status } from './booking_status';
import { chat } from './chat';
import { find_cat_sitters } from './find_cat_sitters';
import { payment } from './payment';
import { profile } from './profile';
import { registration } from './registration';
import { session } from './session';

const rootReducer = combineReducers({
  account,
  authentication,
  booking_actions,
  booking_status,
  chat,
  find_cat_sitters,
  payment,
  profile,
  registration,
  session,
});

export default rootReducer;

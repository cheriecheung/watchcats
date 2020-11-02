import { combineReducers } from 'redux';

import { account } from './account';
import { authentication } from './authentication';
import { bookings } from './bookings';
import { chat } from './chat';
import { find_cat_sitters } from './find_cat_sitters';
import { is_logged_in } from './is_logged_in'
import { payment } from './payment';
import { profile } from './profile';
import { registration } from './registration';
import { two_factor_auth } from './two_factor_auth';

const rootReducer = combineReducers({
  account,
  authentication,
  bookings,
  chat,
  find_cat_sitters,
  is_logged_in,
  payment,
  profile,
  registration,
  two_factor_auth
});

export default rootReducer;

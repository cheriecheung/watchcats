import { combineReducers } from 'redux';

import accountReducer from './account';
import authenticationReducer from './authentication';
import bookingsReducer from './bookings';
import chatReducer from './chat';
import findCatSittersReducer from './find_cat_sitters';
import isLoggedInReducer from './is_logged_in'
import paymentReducer from './payment';
import profileReducer from './profile';
import twoFactorAuthenticationReducer from './two_factor_auth';

const rootReducer = combineReducers(
  Object.assign(
    accountReducer,
    authenticationReducer,
    bookingsReducer,
    chatReducer,
    findCatSittersReducer,
    isLoggedInReducer,
    paymentReducer,
    profileReducer,
    twoFactorAuthenticationReducer
  ),
);

export default rootReducer;
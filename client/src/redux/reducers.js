import { combineReducers } from 'redux';

import account_reducer from './account/reducer';
import app_reducer from './app/reducer';
import authentication_reducer from './authentication/reducer';
import bookings_reducer from './bookings/reducer';
import chat_reducer from './chat/reducer';
import error_reducer from './error/reducer'
import find_cat_sitter_reducer from './find_cat_sitter/reducer';
import loading_reducer from './loading/reducer'
import notifications_reducer from './notifications/reducer';
import payment_reducer from './payment/reducer';
import profile_reducer from './profile/reducer';

const rootReducer = combineReducers(
  Object.assign(
    account_reducer,
    app_reducer,
    authentication_reducer,
    bookings_reducer,
    chat_reducer,
    error_reducer,
    find_cat_sitter_reducer,
    loading_reducer,
    notifications_reducer,
    payment_reducer,
    profile_reducer,
  ),
);

export default rootReducer;
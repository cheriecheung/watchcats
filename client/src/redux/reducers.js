import { combineReducers } from 'redux';

import account_reducer from './account/reducer';
import authentication_reducer from './authentication/reducer';
import bookings_reducer from './bookings/reducer';
import chat_reducer from './chat/reducer';
import find_cat_sitter_reducer from './find_cat_sitter/reducer';
import payment_reducer from './payment/reducer';
import profile_reducer from './profile/reducer';

const rootReducer = combineReducers(
  Object.assign(
    account_reducer,
    authentication_reducer,
    bookings_reducer,
    chat_reducer,
    find_cat_sitter_reducer,
    payment_reducer,
    profile_reducer,
  ),
);

export default rootReducer;
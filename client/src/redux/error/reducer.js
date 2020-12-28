import Immutable from 'seamless-immutable';
import ErrorActionTypes from './actionTypes'

const initialState = Immutable({
  accountError: '',
  appError: '',
  authError: '',
  bookingsError: '',
  chatError: '',
  findSitterError: '',
  paymentError: '',
  profileError: ''
});

const error_reducer = {
  error: (state = initialState, action) => {
    switch (action.type) {
      case ErrorActionTypes.CLEAR_ALL_ERRORS:
        return initialState
      case ErrorActionTypes.CLEAR_ERROR:
        return { ...state, [action.errorType]: '' }
      case ErrorActionTypes.SET_ACCOUNT_ERROR:
        return { ...state, accountError: action.payload };
      case ErrorActionTypes.SET_APP_ERROR:
        return { ...state, appError: action.payload };
      case ErrorActionTypes.SET_AUTH_ERROR:
        return { ...state, authError: action.payload };
      case ErrorActionTypes.SET_BOOKINGS_ERROR:
        return { ...state, bookingsError: action.payload };
      case ErrorActionTypes.SET_CHAT_ERROR:
        return { ...state, chatError: action.payload };
      case ErrorActionTypes.SET_FIND_SITTER_ERROR:
        return { ...state, findSitterError: action.payload };
      case ErrorActionTypes.SET_PAYMENT_ERROR:
        return { ...state, paymentError: action.payload };
      case ErrorActionTypes.SET_PROFILE_ERROR:
        return { ...state, profileError: action.payload };
      default:
        return state;
    }
  }
}

export default error_reducer
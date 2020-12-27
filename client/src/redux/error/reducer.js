import Immutable from 'seamless-immutable';
import ErrorTypes from './actionTypes'

const initialState = Immutable({
  accountError: '',
  appError: '',
  authenticationError: '',
  bookingsError: '',
  chatError: '',
  findCatSitterError: '',
  paymentError: '',
  profileError: ''
});

const error_reducer = {
  error: (state = initialState, action) => {
    switch (action.type) {
      case ErrorTypes.CLEAR_ALL_ERRORS:
        return initialState
      case ErrorTypes.CLEAR_ERROR:
        return { ...state, [action.errorType]: '' }
      case ErrorTypes.ACCOUNT_ERROR:
        return { ...state, accountError: action.payload };
      case ErrorTypes.APP_ERROR:
        return { ...state, appError: action.payload };
      case ErrorTypes.AUTHENTICATION_ERROR:
        return { ...state, authenticationError: action.payload };
      case ErrorTypes.BOOKINGS_ERROR:
        return { ...state, bookingsError: action.payload };
      case ErrorTypes.CHAT_ERROR:
        return { ...state, chatError: action.payload };
      case ErrorTypes.FIND_CAT_SITTER_ERROR:
        return { ...state, findCatSitterError: action.payload };
      case ErrorTypes.PAYMENT_ERROR:
        return { ...state, paymentError: action.payload };
      case ErrorTypes.PROFILE_ERROR:
        return { ...state, profileError: action.payload };
      default:
        return state;
    }
  }
}

export default error_reducer
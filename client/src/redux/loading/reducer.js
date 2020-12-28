import Immutable from 'seamless-immutable';
import LoadingActionTypes from './actionTypes'

const initialState = Immutable({
  accountLoading: '',
  appLoading: '',
  authLoading: '',
  bookingsLoading: '',
  chatLoading: '',
  findSitterLoading: '',
  paymentLoading: '',
  profileLoading: ''
});

const loading_reducer = {
  loading: (state = initialState, action) => {
    switch (action.type) {
      case LoadingActionTypes.CLEAR_LOADING:
        return { ...state, [action.loadingType]: '' }
      case LoadingActionTypes.SET_ACCOUNT_LOADING:
        return { ...state, accountLoading: action.payload };
      case LoadingActionTypes.SET_APP_LOADING:
        return { ...state, appLoading: action.payload };
      case LoadingActionTypes.SET_AUTH_LOADING:
        return { ...state, authLoading: action.payload };
      case LoadingActionTypes.SET_BOOKINGS_LOADING:
        return { ...state, bookingsLoading: action.payload };
      case LoadingActionTypes.SET_CHAT_LOADING:
        return { ...state, chatLoading: action.payload };
      case LoadingActionTypes.SET_FIND_SITTER_LOADING:
        return { ...state, findSitterLoading: action.payload };
      case LoadingActionTypes.SET_PAYMENT_LOADING:
        return { ...state, paymentLoading: action.payload };
      case LoadingActionTypes.SET_PROFILE_LOADING:
        return { ...state, profileLoading: action.payload };
      default:
        return state;
    }
  }
}

export default loading_reducer
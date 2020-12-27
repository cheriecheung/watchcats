import Immutable from 'seamless-immutable';
import LoadingTypes from './actionTypes'

const initialState = Immutable({
  accountLoading: '',
  appLoading: '',
  authenticationLoading: '',
  bookingsLoading: '',
  chatLoading: '',
  findCatSitterLoading: '',
  paymentLoading: '',
  profileLoading: ''
});

const loading_reducer = {
  loading: (state = initialState, action) => {
    switch (action.type) {
      case LoadingTypes.CLEAR_LOADING:
        return { ...state, [action.loadingType]: '' }
      case LoadingTypes.ACCOUNT_LOADING:
        return { ...state, accountLoading: action.payload };
      case LoadingTypes.APP_LOADING:
        return { ...state, appLoading: action.payload };
      case LoadingTypes.AUTHENTICATION_LOADING:
        return { ...state, authenticationLoading: action.payload };
      case LoadingTypes.BOOKINGS_LOADING:
        return { ...state, bookingsLoading: action.payload };
      case LoadingTypes.CHAT_LOADING:
        return { ...state, chatLoading: action.payload };
      case LoadingTypes.FIND_CAT_SITTER_LOADING:
        return { ...state, findCatSitterLoading: action.payload };
      case LoadingTypes.PAYMENT_LOADING:
        return { ...state, paymentLoading: action.payload };
      case LoadingTypes.PROFILE_LOADING:
        return { ...state, profileLoading: action.payload };
      default:
        return state;
    }
  }
}

export default loading_reducer
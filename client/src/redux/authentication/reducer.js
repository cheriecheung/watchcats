import Immutable from 'seamless-immutable';
import AuthActionTypes from './actionTypes'

const initialState = Immutable({
  authActionError: '',
  loginByPhone: false,
  qrCode: '',
  isActivated: false,
});

const authentication_reducer = {
  authentication: (state = initialState, action) => {
    switch (action.type) {
      case AuthActionTypes.ERROR_OCCURED:
        return { ...state, authActionError: action.payload }
      case AuthActionTypes.REGISTER_SUCCESS:
        return {};
      case AuthActionTypes.REGISTER_FAIL:
        return {};
      case AuthActionTypes.GOOGLE_LOGIN:
        return (window.location = action.payload);
      case AuthActionTypes.GOOGLE_LOGIN_SUCCESS:
        return 'login success';
      case AuthActionTypes.LOGIN_SUCCESS:
        return { loggedIn: true };
      case AuthActionTypes.PHONE_LOGIN:
        return { loginByPhone: action.payload }
      case AuthActionTypes.LOGIN_FAIL:
        return { errorMessage: action.payload };
      case AuthActionTypes.LOGOUT_SUCCESS:
        return window.location = '/login';
      case AuthActionTypes.VERIFY_SUCCESS:
      case AuthActionTypes.VERIFY_FAIL:
      case AuthActionTypes.ACTIVATE_EMAIL_REQUESTED:
        return { payload: action.payload };
      case AuthActionTypes.PASSWORD_RESET_EMAIL_REQUESTED:
        return { passwordResetRequested: action.payload }
      // case 'ACCESS_TOKEN_ATTAINED':
      //   return { isLoggedIn: true }
      case AuthActionTypes.QR_CODE_RETURNED:
        return { ...state, qrCode: action.payload }
      case AuthActionTypes.TWO_FACTOR_ACTIVATED:
        return { ...state, isActivated: true }
      case AuthActionTypes.TWO_FACTOR_DISABLED:
        return { ...state, isActivated: false }
      default:
        return state;
    }
  }
}

export default authentication_reducer;
import Immutable from 'seamless-immutable';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = Immutable({
  loginByPhone: false,
});

const authenticationReducer = {
  authentication: (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {};
      case REGISTER_FAIL:
        return {};
      case 'GOOGLE_LOGIN':
        return (window.location = action.payload);
      case 'GOOGLE_LOGIN_SUCCESS':
        return 'login success';
      case LOGIN_SUCCESS:
        return { loggedIn: true };
      case 'PHONE_LOGIN':
        return { loginByPhone: action.payload }
      case LOGIN_FAIL:
        return { errorMessage: action.payload };
      case LOGOUT_SUCCESS:
        return window.location = '/login';
      case VERIFY_SUCCESS:
      case VERIFY_FAIL:
      case 'ACTIVATE_EMAIL_REQUESTED':
        return { payload: action.payload };
      case 'PASSWORD_RESET_EMAIL_REQUESTED':
        return { passwordResetRequested: action.payload }
      // case 'ACCESS_TOKEN_ATTAINED':
      //   return { isLoggedIn: true }
      default:
        return state;
    }
  }
}

export default authenticationReducer;
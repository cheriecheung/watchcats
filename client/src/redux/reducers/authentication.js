import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from '../actions/types';

export function authentication(state = {}, action) {
  console.log({ state });
  switch (action.type) {
    case 'GOOGLE_LOGIN':
      return (window.location = action.payload);
    case 'GOOGLE_LOGIN_SUCCESS':
      return 'login success';
    case LOGIN_SUCCESS:
      return { loggedIn: true };
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

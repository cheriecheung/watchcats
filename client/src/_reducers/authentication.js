import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from '../_actions/types';

let userItem = localStorage.getItem('user');
const initialState = userItem ? { loggedIn: true, user: userItem } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case 'GOOGLE_LOGIN':
      return (window.location = action.payload);
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case LOGIN_FAIL:
      return { errorMessage: action.payload };
    case LOGOUT_SUCCESS:
      return {};
    case VERIFY_SUCCESS:
      return { payload: action.payload };
    case VERIFY_FAIL:
      return {
        payload: action.payload,
        status: action.status,
      };
    default:
      return state;
  }
}

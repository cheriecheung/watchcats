import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from '../_actions/types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let sessionId = cookies.get('sid');
const initialState = sessionId ? { loggedIn: true } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case 'GOOGLE_LOGIN':
      return (window.location = action.payload);
    case LOGIN_SUCCESS:
      return { loggedIn: true };
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

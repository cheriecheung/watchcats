import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../_actions/types';

let userItem = localStorage.getItem('user');
const initialState = userItem ? { loggedIn: true, user: userItem } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case LOGIN_FAIL:
      return { errorMessage: action.payload };
    case LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}

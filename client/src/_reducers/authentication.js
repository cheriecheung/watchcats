import { userActions } from '../_actions';
const user = userActions.action;

let userItem = localStorage.getItem('user');
const initialState = userItem ? { loggedIn: true, user: userItem } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case user.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case user.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case user.LOGIN_FAILURE:
      return { errorMessage: action.payload };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
}

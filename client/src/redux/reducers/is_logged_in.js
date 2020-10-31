export function is_logged_in(state = {}, action) {
  switch (action.type) {
    case 'ACCESS_TOKEN_ATTAINED':
      return { isLoggedIn: true }
    default:
      return state;
  }
}


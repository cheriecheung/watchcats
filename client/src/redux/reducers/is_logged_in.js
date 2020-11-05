const isLoggedInReducer = {
  isLoggedIn: (state = {}, action) => {
    switch (action.type) {
      case 'ACCESS_TOKEN_ATTAINED':
        return { isLoggedIn: true }
      default:
        return state;
    }
  }
}

export default isLoggedInReducer

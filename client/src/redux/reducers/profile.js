const profileReducer = {
  profile: (state = {}, action) => {
    switch (action.type) {
      case 'GET_PROFILE':
        return { data: action.payload };
      default:
        return state;
    }
  }
}

export default profileReducer
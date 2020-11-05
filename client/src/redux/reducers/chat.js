const chatReducer = {
  chat: (state = {}, action) => {
    switch (action.type) {
      case 'GET_CHAT_CONTACTS':
        return { data: action.payload };
      case 'GET_CHAT_CONVERSATION':
        return { data: action.payload };
      default:
        return state;
    }
  }
}

export default chatReducer
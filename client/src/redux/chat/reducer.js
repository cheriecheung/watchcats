import Immutable from 'seamless-immutable';
import ChatActionTypes from './actionTypes'

const chat_reducer = {
  chat: (state = {}, action) => {
    switch (action.type) {
      case ChatActionTypes.GET_CHAT_CONTACTS:
        return { data: action.payload };
      case ChatActionTypes.GET_CHAT_CONVERSATION:
        return { data: action.payload };
      default:
        return state;
    }
  }
}

export default chat_reducer
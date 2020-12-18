import Immutable from 'seamless-immutable';
import ChatActionTypes from './actionTypes'

const initialState = Immutable({
  chatList: [],
  conversationInfo: {},
  messages: []
});

const chat_reducer = {
  chat: (state = initialState, action) => {
    switch (action.type) {
      case ChatActionTypes.CHAT_LIST_RETURNED:
        return { ...state, chatListContacts: action.payload };
      case ChatActionTypes.CHAT_CONVERSATION_RETURNED:
        return {
          ...state,
          conversationInfo: action.payload.conversationInfo,
          messages: action.payload.messages
        };
      case ChatActionTypes.LATEST_MESSAGE_RETURNED:
        return {
          ...state,
          messages: state.messages.concat(action.payload)
        };
      default:
        return state;
    }
  }
}

export default chat_reducer
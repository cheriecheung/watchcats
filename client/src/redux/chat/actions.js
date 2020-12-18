import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import ChatActionTypes from './actionTypes'
import ErrorTypes from '../error/actionTypes'

const contactsUrl = `/chat/list`;
const conversationUrl = (id) => `/chat/conversation?recipient=${id}`;

export function getChatList() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(contactsUrl(), getConfig());
      dispatch({ type: ChatActionTypes.CHAT_LIST_RETURNED, payload: data });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.CHAT_ERROR, payload: data })
    }
  };
}

export function getChatConversation(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(conversationUrl(id), getConfig());
      dispatch({ type: ChatActionTypes.CHAT_CONVERSATION_RETURNED, payload: data });
    } catch (e) {
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.CHAT_ERROR, payload: data })
    }
  };
}


export function concatLatestMessage(data) {
  return {
    type: ChatActionTypes.LATEST_MESSAGE_RETURNED,
    payload: data
  }
}
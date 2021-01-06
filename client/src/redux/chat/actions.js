import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import ChatActionTypes from './actionTypes'
import ErrorActionTypes from '../error/actionTypes'
import NotificationsActionTypes from '../notifications/actionTypes'

const chatListUrl = `/chat/list`;
const conversationUrl = (id) => `/chat/conversation?recipient=${id}`;

export function getChatList() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(chatListUrl, getConfig());
      dispatch({ type: ChatActionTypes.CHAT_LIST_RETURNED, payload: data });
      console.log({ data })
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_CHAT_ERROR, payload: data })
    }
  };
}

export function getChatConversation(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(conversationUrl(id), getConfig());
      const { conversationInfo, messages, hasUnreadChats, unreadChats } = data

      dispatch({
        type: ChatActionTypes.CHAT_CONVERSATION_RETURNED,
        payload: { conversationInfo, messages }
      });
      dispatch({
        type: NotificationsActionTypes.UPDATE_CHAT_NOTIFICATIONS,
        payload: { hasUnreadChats, unreadChats }
      });
    } catch (e) {
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_CHAT_ERROR, payload: data })
    }
  };
}

export function concatLatestMessage(message) {
  return {
    type: ChatActionTypes.LATEST_MESSAGE_RETURNED,
    payload: message
  }
}

// dispatch?
export function updateChatList(chatList) {
  return {
    type: ChatActionTypes.CHAT_LIST_RETURNED,
    payload: { chatList }
  }
}

// dispatch?
export function emptyConversation() {
  return { type: ChatActionTypes.CONVERSATION_EMPTIED }
}
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const contactsUrl = (id) => `${REACT_APP_API_DOMAIN}/chat/contact/${id}`;
const conversationUrl = (id) => `${REACT_APP_API_DOMAIN}/chat/conversation/${id}`;

const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

export function getChatContacts(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(contactsUrl(id), config);
      dispatch({ type: 'GET_CHAT_CONTACTS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getChatConversation(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(conversationUrl(id), config);
      dispatch({ type: 'GET_CHAT_CONVERSATION', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

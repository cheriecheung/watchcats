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
  return (dispatch) => {
    axios
      .get(contactsUrl(id), config)
      .then((response) => {
        dispatch({
          type: 'GET_CHAT_CONTACTS',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function getChatConversation(id) {
  return (dispatch) => {
    axios
      .get(conversationUrl(id), config)
      .then((response) => {
        dispatch({
          type: 'GET_CHAT_CONVERSATION',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const sittersURL = `${REACT_APP_API_DOMAIN}/sitter`;
const dateSearchURL = `${REACT_APP_API_DOMAIN}/sitter/available`;

export function getAllSitters() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(sittersURL);
      dispatch({ type: 'GET_ALL_SITTERS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function searchByDate() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(dateSearchURL);
      dispatch({ type: 'GET_ALL_SITTERS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

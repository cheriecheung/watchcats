import axios from 'axios';

const { REACT_APP_API_DOMAIN } = process.env;

const sittersURL = `${REACT_APP_API_DOMAIN}/sitter`;
const filterByDateURL = `${REACT_APP_API_DOMAIN}/sitter/availability`;

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

export function filterByDate() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(filterByDateURL);
      dispatch({ type: 'GET_ALL_SITTERS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sortSitters(sortType) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${sittersURL}?sort=${sortType}`);
      dispatch({ type: 'GET_ALL_SITTERS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

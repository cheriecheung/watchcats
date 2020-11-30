import axios from 'axios';
import FindCatSitterActionTypes from './actionTypes'

const { REACT_APP_API_DOMAIN } = process.env;

export function getSittersInBounds(query) {
  return async (dispatch) => {
    try {
      const queryString = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      console.log({ queryString })

      const url = `${REACT_APP_API_DOMAIN}/sitter?${queryString}`

      const { data } = await axios.get(url);
      dispatch({ type: FindCatSitterActionTypes.GET_SITTERS_IN_BOUNDS, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}
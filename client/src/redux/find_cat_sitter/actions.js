import axios from 'axios';
import FindCatSitterActionTypes from './actionTypes'

const { REACT_APP_API_DOMAIN } = process.env;

export function getSittersInBounds(query) {
  return async (dispatch) => {
    const { neLat, neLng, swLat, swLng } = query;
    if (!neLat || !neLng || !swLat || !swLng) return;

    try {
      const queryString = Object.entries(query)
        .filter(([key, value]) => key && value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const url = `${REACT_APP_API_DOMAIN}/sitter?${queryString}`

      const { data } = await axios.get(url);
      dispatch({ type: FindCatSitterActionTypes.GET_SITTERS_IN_BOUNDS, payload: data });

      localStorage.setItem('mapSearch', 'disabled');
    } catch (e) {
      console.log({ e });
    }
  };
}

export function setInitialState() {
  return async (dispatch) => {
    dispatch({ type: FindCatSitterActionTypes.SET_INITIAL_STATE });
  }
}
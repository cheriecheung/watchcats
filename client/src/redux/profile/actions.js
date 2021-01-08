import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import ProfileActionTypes from './actionTypes'
import ErrorActionTypes from '../error/actionTypes'

const { REACT_APP_API_DOMAIN } = process.env;

const sitterProfileURL = (id) => `${REACT_APP_API_DOMAIN}/sitter/profile/${id}`;
const ownerProfileURL = (id) => `${REACT_APP_API_DOMAIN}/owner/profile/${id}`;

export function getSitterProfile(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(sitterProfileURL(id), getConfig());
      console.log({ data });
      dispatch({ type: ProfileActionTypes.GET_PROFILE, payload: data });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_PROFILE_ERROR, payload: data })
    }
  };
}

export function getOwnerProfile(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(ownerProfileURL(id), getConfig());
      dispatch({ type: ProfileActionTypes.GET_PROFILE, payload: data });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_PROFILE_ERROR, payload: data })
    }
  };
}

import axios from 'axios';
import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import { setAccessToken } from '../../utility/accessToken';
import AuthActionTypes from './actionTypes'
import ErrorActionTypes from '../error/actionTypes'
import LoadingActionTypes from '../loading/actionTypes'
import { clearLoading } from '../loading/actions'
import LOADING from '../../constants/loadingTypes'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const googleLoginURL = `${REACT_APP_API_DOMAIN}/googlelogin`;
const activateURL = `${REACT_APP_API_DOMAIN}/activate-account`;
const phoneLoginURL = `${REACT_APP_API_DOMAIN}/phone-login`;
const loginURL = `${REACT_APP_API_DOMAIN}/login`;
const logoutURL = '/logout';

export function googleLogin() {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_AUTH_LOADING,
      payload: LOADING.GOOGLE_LOGIN
    });

    try {
      const { data } = await axios.get(googleLoginURL);

      console.log({ data })
      dispatch({ type: AuthActionTypes.GOOGLE_LOGIN, payload: data });
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('authLoading'))
    }
  };
}

export function activateAccount(token) {
  return async (dispatch) => {
    try {
      await axios.post(activateURL, {}, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: AuthActionTypes.ACTIVATION_SUCCESS });
    } catch (e) {
      console.log({ e });
      dispatch({ type: AuthActionTypes.ACTIVATION_FAILED });
    }
  };
}

export function phoneLogin(code) {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_AUTH_LOADING,
      payload: LOADING.PHONE_LOGIN
    });

    try {
      const { data } = await axios.post(phoneLoginURL, { code, shortId: cookies.get('shortId') }, {
        withCredentials: true,
        // credentials: 'include',
      });
      const { shortId, accessToken } = data || {};
      await setAccessToken(accessToken)

      window.location = "/account";

    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_AUTH_ERROR, payload: data })
      dispatch(clearLoading('authLoading'))
    }
  }
}

export function login(email, password) {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_AUTH_LOADING,
      payload: LOADING.LOCAL_LOGIN
    });

    try {
      const { data } = await axios.post(loginURL, { email, password }, {
        withCredentials: true,
        // credentials: 'include',
      });
      const { shortId, accessToken } = data || {};

      if (shortId, accessToken) {
        await setAccessToken(accessToken)
        window.location = "/account";
      } else {
        dispatch({ type: AuthActionTypes.PHONE_LOGIN, payload: true });
      }
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_AUTH_ERROR, payload: data })
      dispatch(clearLoading('authLoading'))
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await axiosInstance().delete(logoutURL, getConfig());
      dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });
      // window.location = '/';
      cookies.remove('shortId', { path: "/" })
    } catch (e) {
      console.log({ e });
    }
  };
}

import axios from 'axios';
import AuthActionTypes from './actionTypes'
import ErrorTypes from '../error/actionTypes'
import { setAccessToken } from '../../utility/accessToken';
import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const googleLoginURL = `${REACT_APP_API_DOMAIN}/googlelogin`;
const googleAuthURL = `${REACT_APP_API_DOMAIN}/getUser`;
const activateURL = `${REACT_APP_API_DOMAIN}/activate-account`;
const phoneLoginURL = `${REACT_APP_API_DOMAIN}/phone-login`;
const loginURL = `${REACT_APP_API_DOMAIN}/login`;
const logoutURL = '/logout';

export function googleLogin() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(googleLoginURL);

      console.log({ data })
      dispatch({ type: AuthActionTypes.GOOGLE_LOGIN, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function googleAuthenticate() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(googleAuthURL, {
        withCredentials: true,
        // credentials: 'include',
      });
      const { shortId } = data || {};
      cookies.set('shortId', shortId);

      dispatch({ type: AuthActionTypes.GOOGLE_LOGIN_SUCCESS });
      window.location = `/account/${shortId}`;
    } catch (e) {
      window.location = '/';
      console.log({ e });
    }
  };
}

export function verifyEmail(token) {
  return async (dispatch) => {
    try {
      await axios.post(activateURL, {}, { headers: { Authorization: `Bearer ${token}` } });

      // if already activated, give different response
      dispatch({ type: AuthActionTypes.VERIFY_SUCCESS, payload: 'Activation successful' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: AuthActionTypes.VERIFY_FAIL, payload: 'Activation failed' });
    }
  };
}

export function phoneLogin(code) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(phoneLoginURL, { code }, {
        withCredentials: true,
        // credentials: 'include',
      });
      const { shortId, accessToken } = data || {};

      await setAccessToken(accessToken)
      // dispatch({ type: LOGIN_SUCCESS, user });

      window.location = `/account/${shortId}`;
    } catch (e) {
      console.log({ e });
      dispatch({ type: AuthActionTypes.LOGIN_FAIL, err: e });
    }
  }
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(loginURL, { email, password }, {
        withCredentials: true,
        // credentials: 'include',
      });
      const { shortId, accessToken } = data || {};

      if (shortId, accessToken) {
        await setAccessToken(accessToken)
        window.location = `/account/${shortId}`;
      } else {
        dispatch({ type: AuthActionTypes.PHONE_LOGIN, payload: true });
      }
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.AUTHENTICATION_ERROR, payload: data })
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

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

const googleLoginURL = `${REACT_APP_API_DOMAIN}/google-login`;
const googleUserURL = `${REACT_APP_API_DOMAIN}/google-user`;
const activateURL = `${REACT_APP_API_DOMAIN}/activate-account`;
const phoneLoginURL = `${REACT_APP_API_DOMAIN}/phone-login`;
const loginURL = `${REACT_APP_API_DOMAIN}/login`;
const logoutURL = '/logout';

export function onGetGoogleLoginURL() {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_AUTH_LOADING,
      payload: LOADING.GET_GOOGLE_LOGIN_URL
    });

    try {
      const { data } = await axios.get(googleLoginURL);

      dispatch({ type: AuthActionTypes.GET_GOOGLE_LOGIN_URL, payload: data });
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('authLoading'))
    }
  };
}

export function onGetGoogleUser() {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_AUTH_LOADING,
      payload: LOADING.GET_GOOGLE_LOGIN_URL
    });

    try {
      const { data } = await axios.get(googleUserURL, { withCredentials: true });

      const { accessToken, refreshToken, urlId } = data || {};

      await setAccessToken(accessToken)
      cookies.set('refreshToken', refreshToken)
      cookies.set('urlId', urlId)

      console.log({ accessToken, refreshToken, urlId })

      // window.location = "/account";
    } catch (e) {
      console.log({ e });
      window.location = "/google-login/failcallback";
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

    const urlId = cookies.get('urlId');

    try {
      const { data } = await axios.post(
        phoneLoginURL,
        { code, urlId },
        { withCredentials: true }
      );

      const { accessToken, refreshToken } = data || {};

      await setAccessToken(accessToken)
      cookies.set('refreshToken', refreshToken)

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
      const { data } = await axios.post(
        loginURL,
        { email, password, asDemoUser: false },
        { withCredentials: true, }
      );
      const { accessToken, refreshToken, urlId } = data || {};

      if (accessToken) {
        await setAccessToken(accessToken)
        cookies.set('refreshToken', refreshToken)
        cookies.set('urlId', urlId)

        window.location = "/account";
      } else {
        cookies.set('urlId', urlId)

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

export function loginAsDemoUser() {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_AUTH_LOADING,
      payload: LOADING.DEMO_USER_LOGIN
    });

    try {
      const { data } = await axios.post(
        loginURL,
        { asDemoUser: true },
        { withCredentials: true }
      );

      const { accessToken, refreshToken, urlId } = data || {};

      await setAccessToken(accessToken)
      cookies.set('refreshToken', refreshToken)
      cookies.set('urlId', urlId)

      window.location = "/account";
    }
    catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_AUTH_ERROR, payload: data })
      dispatch(clearLoading('authLoading'))
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await axiosInstance().delete(logoutURL, getConfig());
      dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS });

      cookies.remove('refreshToken', { path: "/" })
      cookies.remove('urlId', { path: "/" })
    } catch (e) {
      console.log({ e });
    }
  };
}

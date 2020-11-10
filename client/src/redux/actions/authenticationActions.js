import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from './types';
import Cookies from 'universal-cookie';
import { getAccessToken, setAccessToken } from '../../utility/accessToken';
import axiosInstance from '../../utility/axiosInstance';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const googleLoginURL = `${REACT_APP_API_DOMAIN}/googlelogin`;
const googleAuthURL = `${REACT_APP_API_DOMAIN}/getUser`;
const registerURL = `${REACT_APP_API_DOMAIN}/register`;
const activateURL = `${REACT_APP_API_DOMAIN}/activate-account`;
const activationEmailURL = `${REACT_APP_API_DOMAIN}/activate-account-email`;

const phoneLoginURL = `${REACT_APP_API_DOMAIN}/phone-login`;
const loginURL = `${REACT_APP_API_DOMAIN}/login`;
const logoutURL = '/logout';
const resetPasswordEmailURL = `${REACT_APP_API_DOMAIN}/forgot-password-email`;
const resetPasswordURL = `${REACT_APP_API_DOMAIN}/forgot-password-email`;

const passwordURL = `/password`

const googleAuthenticatorQrCodeURL = `google-authenticator-qrcode`
const googleAuthenticatorVerifyCodeURL = `google-authenticator-verify-code`

const getConfig = () => {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }
}

export function checkToken() {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/refresh_token`)

      const { accessToken } = data;
      setAccessToken(accessToken)

      dispatch({ type: 'ACCESS_TOKEN_ATTAINED' });
    } catch (err) {
      console.log({ err });
    }
  };
}

export function getGoogleAuthenticatorQrCode() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(googleAuthenticatorQrCodeURL, getConfig());
      dispatch({ type: 'QR_CODE_RETURNED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function verifyGoogleAuthenticatorCode(code) {
  return async (dispatch) => {
    try {
      // pass token too?
      const { data } = await axiosInstance().post(googleAuthenticatorVerifyCodeURL, { code }, getConfig());
      dispatch({ type: 'CODE_VALID', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function googleLogin() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(googleLoginURL);

      console.log({ data })
      dispatch({ type: 'GOOGLE_LOGIN', payload: data });
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

      dispatch({ type: 'GOOGLE_LOGIN_SUCCESS' });
      window.location = `/account/${shortId}`;
    } catch (e) {
      window.location = '/';
      console.log({ e });
    }
  };
}

export function registration(firstName, lastName, email, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(registerURL, {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      console.log({ data })

      dispatch({
        type: REGISTER_SUCCESS,
        payload: 'Registration successful. Please log into your email to activate your account.',
      });
    } catch (e) {
      console.log({ e });
      dispatch({
        type: REGISTER_FAIL,
        payload: 'Registration fail. Please try again',
      });
    }
  };
}

export function verifyEmail(token) {
  return async (dispatch) => {
    try {
      await axios.post(activateURL, {}, { headers: { Authorization: `Bearer ${token}` } });

      dispatch({ type: VERIFY_SUCCESS, payload: 'Activation successful' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: VERIFY_FAIL, payload: 'Activation failed' });
    }
  };
}

export function getActivationEmail(email) {
  return async (dispatch) => {
    try {
      await axios.post(activationEmailURL, { email });

      dispatch({ type: 'ACTIVATE_EMAIL_REQUESTED', payload: 'Email requested' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: 'ACTIVATE_EMAIL_REQUESTED', payload: 'Email requested' });
    }
  };
}

export function getPasswordResetEmail(email) {
  return async (dispatch) => {
    try {
      await axios.post(resetPasswordEmailURL, { email });

      dispatch({ type: 'PASSWORD_RESET_EMAIL_REQUESTED', payload: 'Email requested' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: 'PASSWORD_RESET_EMAIL_REQUESTED', payload: 'Email requested' });
    }
  };
}

export function resetPassword(password) {
  return async (dispatch) => {
    try {
      await axiosInstance().put(passwordURL, { password }, getConfig());

      dispatch({ type: 'PASSWORD_RESET', payload: 'Password reset' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: 'PASSWORD_RESET', payload: 'Password reset' });
    }
  };
}

export function phoneLogin(code) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(phoneLoginURL, code, {
        withCredentials: true,
        // credentials: 'include',
      });
      const { shortId, accessToken } = data || {};

      await setAccessToken(accessToken)
      // dispatch({ type: LOGIN_SUCCESS, user });

      window.location = `/account/${shortId}`;
    } catch (e) {
      console.log({ e });
      dispatch({ type: LOGIN_FAIL, err: e });
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
        dispatch({ type: 'PHONE_LOGIN', payload: true });
      }
    } catch (e) {
      const { response: { data } } = e
      console.log({ e });

      dispatch({
        type: LOGIN_FAIL,
        payload: data || "Email and password combination isn't valid",
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await axiosInstance().delete(logoutURL, getConfig());
      dispatch({ type: LOGOUT_SUCCESS });
      // window.location = '/';
      cookies.remove('shortId', { path: "/" })
    } catch (e) {
      console.log({ e });
      dispatch({ type: LOGOUT_FAIL, err: e });
    }
  };
}

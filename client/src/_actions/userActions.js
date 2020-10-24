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
import { getAccessToken, setAccessToken } from '../accessToken';
import axiosInstance from '../_helpers/axiosInstance';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const googleLoginURL = `${REACT_APP_API_DOMAIN}/googlelogin`;
const googleAuthURL = `${REACT_APP_API_DOMAIN}/getUser`;
const registerURL = `${REACT_APP_API_DOMAIN}/register`;
const activateURL = `${REACT_APP_API_DOMAIN}/activate-account`;
const activationEmailURL = `${REACT_APP_API_DOMAIN}/activate-account-email`;

const loginURL = `${REACT_APP_API_DOMAIN}/login`;
const logoutURL = `${REACT_APP_API_DOMAIN}/logout`;
const resetPasswordEmailURL = `${REACT_APP_API_DOMAIN}/forgot-password-email`;
const resetPasswordURL = `${REACT_APP_API_DOMAIN}/forgot-password-email`;

const googleAuthenticatorQrCodeURL = `${REACT_APP_API_DOMAIN}/google-authenticator-qrcode`
const googleAuthenticatorVerifyCodeURL = `${REACT_APP_API_DOMAIN}/google-authenticator-verify-code`

// const accessToken = getAccessToken()

const config = {
  withCredentials: true,
  // credentials: 'include',
  headers: {
    Authorization: cookies.get('userId'),
  },
};

export function testAxiosInstance() {
  return async (dispatch) => {
    try {
      const data = await axiosInstance().get(`/test_axios`)

      console.log({ data })
    } catch (err) {
      console.log({ err });
    }
  };
}

export function checkToken() {
  return async (dispatch) => {
    try {
      // const { data } = await axios.post(`/refresh_token`, {}, { headers: { Authorization: `Bearer ${accessTokenValue}` } });

      const { data } = await axios.post(`/refresh_token`)

      console.log({ data })

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
      const { data } = await axios.get(googleAuthenticatorQrCodeURL);
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
      const { data } = await axios.post(googleAuthenticatorVerifyCodeURL, { code });
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
      const { userId, shortId } = data || {};

      console.log({ userId, shortId });
      cookies.set('userId', userId);
      cookies.set('shortId', shortId);

      dispatch({ type: 'GOOGLE_LOGIN_SUCCESS', userId });
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
      await axios.post(resetPasswordURL, { password });

      dispatch({ type: 'PASSWORD_RESET', payload: 'Password reset' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: 'PASSWORD_RESET', payload: 'Password reset' });
    }
  };
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(loginURL, { email, password }, {
        withCredentials: true,
        // credentials: 'include',
      });
      const { shortId, id, accessToken } = data || {};

      await setAccessToken(accessToken)
      cookies.set('userId', id);

      // dispatch({ type: LOGIN_SUCCESS, user });

      window.location = `/account/${shortId}`;
    } catch (e) {
      console.log({ e });
      dispatch({
        type: LOGIN_FAIL,
        payload: "Email and password combination isn't valid",
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await axios.delete(logoutURL, config);
      dispatch({ type: LOGOUT_SUCCESS });
      window.location = '/';
    } catch (e) {
      console.log({ e });
      dispatch({ type: LOGOUT_FAIL, err: e });
    }
  };
}

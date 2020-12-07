import axios from 'axios';
import AuthActionTypes from './actionTypes'
import { setAccessToken } from '../../utility/accessToken';
import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import Cookies from 'universal-cookie';
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
const passwordURL = `/password`

// slash?
const googleAuthenticatorQrCodeURL = `google-authenticator-qrcode`
const googleAuthenticatorVerifyCodeURL = `google-authenticator-verify-code`

// export function checkToken() {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post(`/refresh_token`)

//       const { accessToken } = data;
//       setAccessToken(accessToken)

//       dispatch({ type: AuthActionTypes.ACCESS_TOKEN_ATTAINED });
//     } catch (err) {
//       console.log({ err });
//     }
//   };
// }

export function clearAuthActionError() {
  return (dispatch) => {
    dispatch({ type: AuthActionTypes.ERROR_OCCURED, payload: '' });
  }
}

export function disableTwoFactor(code) {
  return async (dispatch) => {
    try {
      // pass token too?
      const { data } = await axiosInstance().delete(phoneLoginURL, { ...getConfig(), data: { code } });
      dispatch({ type: AuthActionTypes.TWO_FACTOR_DISABLED });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getGoogleAuthenticatorQrCode() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(googleAuthenticatorQrCodeURL, getConfig());
      dispatch({ type: AuthActionTypes.QR_CODE_RETURNED, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function verifyGoogleAuthenticatorCode(code) {
  return async (dispatch) => {
    try {
      await axiosInstance().post(googleAuthenticatorVerifyCodeURL, { code }, getConfig());
      dispatch({ type: AuthActionTypes.TWO_FACTOR_ENABLED });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: AuthActionTypes.ERROR_OCCURED, payload: data });
    }
  };
}

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
        type: AuthActionTypes.REGISTER_SUCCESS,
        payload: 'Registration successful. Please log into your email to activate your account.',
      });
    } catch (e) {
      console.log({ e });
      dispatch({
        type: AuthActionTypes.REGISTER_FAIL,
        payload: 'Registration fail. Please try again',
      });
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

export function getActivationEmail(email) {
  return async (dispatch) => {
    try {
      await axios.post(activationEmailURL, { email });

      dispatch({ type: AuthActionTypes.ACTIVATE_EMAIL_REQUESTED, payload: 'Email requested' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: AuthActionTypes.ACTIVATE_EMAIL_REQUESTED, payload: 'Email requested' });
    }
  };
}

export function getPasswordResetEmail(email) {
  return async (dispatch) => {
    try {
      await axios.post(resetPasswordEmailURL, { email });

      dispatch({ type: AuthActionTypes.PASSWORD_RESET_EMAIL_REQUESTED, payload: 'Email requested' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: AuthActionTypes.PASSWORD_RESET_EMAIL_REQUESTED, payload: 'Email requested' });
    }
  };
}

export function resetPassword(newPassword) {
  return async (dispatch) => {
    try {
      await axiosInstance().put(passwordURL, { newPassword }, getConfig());

      dispatch({ type: AuthActionTypes.PASSWORD_RESET });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: AuthActionTypes.ERROR_OCCURED, payload: data });
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
      const { response } = e
      const { data } = response || {}
      console.log({ e });

      dispatch({
        type: AuthActionTypes.LOGIN_FAIL,
        payload: data || "Email and password combination isn't valid",
      });
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
      dispatch({ type: AuthActionTypes.LOGOUT_FAIL, err: e });
    }
  };
}

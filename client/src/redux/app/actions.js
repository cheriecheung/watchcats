import axios from 'axios';
import AppActionTypes from './actionTypes'
import ErrorTypes from '../error/actionTypes'
import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'

const { REACT_APP_API_DOMAIN } = process.env;

const registerURL = `${REACT_APP_API_DOMAIN}/register`;
const activationEmailURL = `${REACT_APP_API_DOMAIN}/activate-account-email`;
const phoneLoginURL = `${REACT_APP_API_DOMAIN}/phone-login`;
const resetPasswordEmailURL = `${REACT_APP_API_DOMAIN}/forgot-password-email`;
const passwordURL = `/password`
const googleAuthenticatorQrCodeURL = `google-authenticator-qrcode`
const googleAuthenticatorVerifyCodeURL = `google-authenticator-verify-code`

// export function checkToken() {

//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post(`/refresh_token`)

//       const { accessToken } = data;
//       setAccessToken(accessToken)

//       dispatch({ type: AppActionTypes.ACCESS_TOKEN_ATTAINED });
//     } catch (err) {
//       console.log({ err });
//     }
//   };
// }

export function register(firstName, lastName, email, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(registerURL, {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      console.log({ data })

      dispatch({
        type: AppActionTypes.REGISTER_SUCCESS,
        payload: 'Registration successful. Please log into your email to activate your account.',
      });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.APP_ERROR, payload: data });
    }
  };
}

export function resetPassword(newPassword) {
  return async (dispatch) => {
    try {
      await axiosInstance().put(passwordURL, { newPassword }, getConfig());

      dispatch({ type: AppActionTypes.PASSWORD_RESET });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.APP_ERROR, payload: data })
    }
  };
}

export function getActivationEmail(email) {
  return async (dispatch) => {
    try {
      await axios.post(activationEmailURL, { email });

      dispatch({ type: AppActionTypes.ACTIVATE_EMAIL_REQUESTED, payload: 'Email requested' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: AppActionTypes.ACTIVATE_EMAIL_REQUESTED, payload: 'Email requested' });
    }
  };
}

export function getPasswordResetEmail(email) {
  return async (dispatch) => {
    try {
      await axios.post(resetPasswordEmailURL, { email });

      dispatch({ type: AppActionTypes.PASSWORD_RESET_EMAIL_REQUESTED, payload: 'Email requested' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: AppActionTypes.PASSWORD_RESET_EMAIL_REQUESTED, payload: 'Email requested' });
    }
  };
}


export function getGoogleAuthenticatorQrCode() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(googleAuthenticatorQrCodeURL, getConfig());
      dispatch({ type: AppActionTypes.QR_CODE_RETURNED, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

// enable 2FA
export function verifyGoogleAuthenticatorCode(code) {
  return async (dispatch) => {
    try {
      await axiosInstance().post(googleAuthenticatorVerifyCodeURL, { code }, getConfig());
      dispatch({ type: AppActionTypes.TWO_FACTOR_ENABLED });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.APP_ERROR, payload: data })
    }
  };
}

export function disableTwoFactor(code) {
  return async (dispatch) => {
    try {
      await axiosInstance().delete(phoneLoginURL, { ...getConfig(), data: { code } });
      dispatch({ type: AppActionTypes.TWO_FACTOR_DISABLED });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.APP_ERROR, payload: data })
    }
  };
}

export function changeLanguage(i18n, language) {
  return (dispatch) => {
    i18n.changeLanguage(language, () => {
      dispatch({
        type: AppActionTypes.CHANGE_LANGUAGE,
        payload: language,
      });
    });
  };
}

export function toggleMobileMenu(isOpen) {
  return (dispatch) => {
    dispatch({
      type: AppActionTypes.TOGGLE_MOBILE_MENU,
      payload: isOpen
    });
  };
}
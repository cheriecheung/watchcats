import axios from 'axios';
import AppActionTypes from './actionTypes'
import ErrorActionTypes from '../error/actionTypes'
import LoadingActionTypes from '../loading/actionTypes'
import { clearLoading } from '../loading/actions'
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

export function clearAppActionStatus() {
  return async (dispatch) => {
    dispatch({ type: AppActionTypes.CLEAR_STATUS });
  }
}

export function register(firstName, lastName, email, password) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_APP_LOADING, payload: 'LOADING/REGISTER' });

    try {
      await axios.post(registerURL, { firstName, lastName, email, password });

      dispatch({ type: AppActionTypes.REGISTRATION_SUCCESSFUL });
      dispatch(clearLoading('appLoading'))
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_APP_ERROR, payload: data });
      dispatch(clearLoading('appLoading'))
    }
  };
}

export function resetPassword(currentPassword, newPassword) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_APP_LOADING, payload: 'LOADING/CHANGE_PASSWORD' });

    try {
      await axiosInstance().put(passwordURL, { currentPassword, newPassword }, getConfig());

      dispatch({ type: AppActionTypes.PASSWORD_RESET });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_APP_ERROR, payload: data })
      dispatch(clearLoading('appLoading'))
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
      dispatch({ type: AppActionTypes.PASSWORD_RESET_EMAIL_REQUESTED });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_APP_ERROR, payload: data });
    }
  };
}

export function resetForgotPassword(newPassword, token) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_APP_LOADING, payload: 'LOADING/RESET_FORGOT_PASSWORD' });

    try {
      await axiosInstance().post(passwordURL, { newPassword }, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: AppActionTypes.FORGOT_PASSWORD_RESET });
      dispatch(clearLoading('appLoading'))
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_APP_ERROR, payload: data })
      dispatch(clearLoading('appLoading'))
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

export function enableTwoFactor(code) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_APP_LOADING, payload: 'LOADING/ENABLE_2FA' });

    try {
      await axiosInstance().post(googleAuthenticatorVerifyCodeURL, { code }, getConfig());
      dispatch({ type: AppActionTypes.TWO_FACTOR_ENABLED });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_APP_ERROR, payload: data })
      dispatch(clearLoading('appLoading'))
    }
  };
}

export function disableTwoFactor(code) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_APP_LOADING, payload: 'LOADING/DISABLE_2FA' });

    try {
      await axiosInstance().delete(phoneLoginURL, { ...getConfig(), data: { code } });
      dispatch({ type: AppActionTypes.TWO_FACTOR_DISABLED });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_APP_ERROR, payload: data })
      dispatch(clearLoading('appLoading'))
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
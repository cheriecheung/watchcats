import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleLogin, googleAuthenticate, phoneLogin, registration } from '../../redux/actions/authenticationActions';
import { getPasswordResetEmail, resetPassword } from '../../redux/actions'

function useLogin() {
  const dispatch = useDispatch();
  const { errorMessage, loginByPhone } = useSelector((state) => state.authentication);

  function onLogin(data) {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  function onGoogleLogin() {
    dispatch(googleLogin());
  }

  function onGoogleAuthenticate() {
    dispatch(googleAuthenticate());
  }

  function onPhoneLogin(data) {
    dispatch(phoneLogin(data));
  }

  return {
    onLogin,
    onGoogleLogin,
    onGoogleAuthenticate,
    onPhoneLogin,
    errorMessage,
    loginByPhone,
  }
}

function useForgotPassword() {
  const dispatch = useDispatch();
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  function onSubmitEmail(data) {
    const { email } = data;
    dispatch(getPasswordResetEmail(email))
    setEmailSubmitted(true)
  }

  function onSubmitNewPassword(data) {
    const { newPassword } = data;
    dispatch(resetPassword(newPassword))
  }

  return {
    emailSubmitted,
    onSubmitEmail,
    onSubmitNewPassword
  }
}

function useRegister() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  // const { } = useSelector((state) => state.authentication);

  function onRegister(data) {
    const { firstName, lastName, email, password } = data;
    dispatch(registration(firstName, lastName, email, password));
  };

  function onGoogleLogin() {
    dispatch(googleLogin());
  }

  function onGoogleAuthenticate() {
    dispatch(googleAuthenticate());
  }

  return {
    t,
    onRegister,
    onGoogleLogin,
    onGoogleAuthenticate,
  }
}

export { useLogin, useForgotPassword, useRegister }

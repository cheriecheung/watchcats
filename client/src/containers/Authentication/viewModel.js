import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  login_default_values,
  login_schema,
  email_verification_default_values,
  send_email_schema,
  password_reset_default_values,
  password_reset_schema,
  register_default_values,
  register_schema
} from './_formConfig'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleLogin, googleAuthenticate, phoneLogin, registration } from '../../redux/actions/authenticationActions';
import { getPasswordResetEmail, resetPassword } from '../../redux/actions'

function useLogin() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { errorMessage, loginByPhone } = useSelector((state) => state.authentication);

  const phoneLoginMethods = useForm();

  const localLoginMethods = useForm({
    defaultValues: login_default_values,
    resolver: yupResolver(login_schema)
  });

  function onLocalLogin(data) {
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
    const { code } = data
    dispatch(phoneLogin(code));
  }

  const localLoginProps = {
    FormProvider,
    localLoginMethods,
    onLocalLogin,
    errorMessage,
  }

  const phoneLoginProps = {
    FormProvider,
    phoneLoginMethods,
    onPhoneLogin,
  }

  return {
    t,
    localLoginProps,
    phoneLoginProps,
    onGoogleLogin,
    onGoogleAuthenticate,
    loginByPhone,
  }
}

function useForgotPassword() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const defaultValues = email_verification_default_values;
  const resolver = yupResolver(send_email_schema)
  const methods = useForm({ defaultValues, resolver });

  function onSubmitEmail(data) {
    const { email } = data;
    dispatch(getPasswordResetEmail(email))
    setEmailSubmitted(true)
  }

  return {
    t,
    FormProvider,
    methods,
    emailSubmitted,
    onSubmitEmail,
  }
}

function useResetPassword() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const defaultValues = password_reset_default_values;
  const resolver = yupResolver(password_reset_schema)
  const methods = useForm({ defaultValues, resolver });

  function onSubmitNewPassword(data) {
    const { newPassword } = data;
    dispatch(resetPassword(newPassword))
  }

  return {
    t,
    FormProvider,
    methods,
    onSubmitNewPassword
  }
}

function useRegister() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  // const { } = useSelector((state) => state.authentication);

  const defaultValues = register_default_values;
  const resolver = yupResolver(register_schema)
  const methods = useForm({ defaultValues, resolver });

  function onRegister(data) {
    const { firstName, lastName, email, password } = data;
    dispatch(registration(firstName, lastName, email, password));
  };

  function onGoogleLogin() {
    dispatch(googleLogin());
  }

  const localRegisterProps = {
    FormProvider,
    methods,
    onRegister
  }

  return {
    t,
    onGoogleLogin,
    localRegisterProps,
  }
}

export { useLogin, useForgotPassword, useResetPassword, useRegister }
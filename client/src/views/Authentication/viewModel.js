import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  login_default_values,
  email_verification_default_values,
  password_reset_default_values,
  register_default_values,
} from './_formConfig/_defaultValues'
import {
  login_schema,
  send_email_schema,
  password_reset_schema,
  register_schema
} from './_formConfig/_validationSchema'
import { useDispatch, useSelector } from 'react-redux';
import {
  verifyEmail,
  login,
  googleLogin,
  phoneLogin,
} from '../../redux/authentication/actions';
import {
  register,
  getActivationEmail,
  getPasswordResetEmail,
  resetPassword
} from '../../redux/app/actions';
import { clearError } from '../../redux/error/actions'

function useAuthentication() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { appError, authenticationError } = useSelector((state) => state.error)

  useEffect(() => {
    dispatch(clearError(['appError', 'authenticationError']))
  }, [])

  return {
    t,
    appError,
    authenticationError
  }
}

function useEmailVerification() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const activate = useSelector((state) => state.authentication);

  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const defaultValues = email_verification_default_values;
  const resolver = yupResolver(send_email_schema)
  const methods = useForm({ defaultValues, resolver });

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [token]);

  function onSubmit(data) {
    const { email } = data;
    dispatch(getActivationEmail(email));
    setEmailSubmitted(true)
  }

  const unsuccessfulProps = {
    FormProvider,
    methods,
    onSubmit,
    emailSubmitted
  }

  return {
    activate,
    unsuccessfulProps
  }
}

function useLogin() {
  const dispatch = useDispatch();
  const { loginByPhone } = useSelector((state) => state.authentication);
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

  function onPhoneLogin(data) {
    const { code } = data
    dispatch(phoneLogin(code));
  }

  const localLoginProps = {
    FormProvider,
    localLoginMethods,
    onLocalLogin,
  }

  const phoneLoginProps = {
    FormProvider,
    phoneLoginMethods,
    onPhoneLogin,
  }

  return {
    localLoginProps,
    phoneLoginProps,
    onGoogleLogin,
    loginByPhone,
  }
}

function useForgotPassword() {
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
    FormProvider,
    methods,
    emailSubmitted,
    onSubmitEmail,
  }
}

function useResetPassword() {
  const dispatch = useDispatch();

  const defaultValues = password_reset_default_values;
  const resolver = yupResolver(password_reset_schema)
  const methods = useForm({ defaultValues, resolver });

  function onSubmitNewPassword(data) {
    const { newPassword } = data;
    dispatch(resetPassword(newPassword))
  }

  return {
    FormProvider,
    methods,
    onSubmitNewPassword
  }
}

function useRegister() {
  const dispatch = useDispatch();
  // const { } = useSelector((state) => state.authentication);

  const defaultValues = register_default_values;
  const resolver = yupResolver(register_schema)
  const methods = useForm({ defaultValues, resolver });

  function onRegister(data) {
    const { firstName, lastName, email, password } = data;
    dispatch(register(firstName, lastName, email, password));
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
    onGoogleLogin,
    localRegisterProps,
  }
}

export {
  useAuthentication,
  useEmailVerification,
  useLogin,
  useForgotPassword,
  useResetPassword,
  useRegister
}
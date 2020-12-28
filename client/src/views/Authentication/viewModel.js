import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  login_default_values,
  account_activation_default_values,
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
  activateAccount,
  login,
  googleLogin,
  phoneLogin,
} from '../../redux/authentication/actions';
import {
  clearAppActionStatus,
  register,
  getActivationEmail,
  getPasswordResetEmail,
  resetForgotPassword
} from '../../redux/app/actions';
import { clearError } from '../../redux/error/actions'
import LOADING from '../../constants/loadingTypes'

function useAuthentication() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { appActionStatus } = useSelector((state) => state.app)
  const { appError, authError } = useSelector((state) => state.error)
  const { appLoading, authLoading } = useSelector((state) => state.loading)

  let isLoadingGoogleLogin = authLoading === LOADING.GOOGLE_LOGIN
  let isLoadingLocalLogin = authLoading === LOADING.LOCAL_LOGIN
  let isLoadingPhoneLogin = authLoading === LOADING.PHONE_LOGIN
  let isLoadingRegister = appLoading === LOADING.REGISTER
  let isLoadingResetForgotPassword = appLoading === LOADING.RESET_FORGOT_PASSWORD
  let isResetForgotPasswordSuccessful = appActionStatus === 'resetForgotPasswordSuccess'

  useEffect(() => {
    dispatch(clearError(['appError', 'authError']))
  }, [])

  return {
    t,
    appActionStatus,
    appError,
    authError,
    isLoadingGoogleLogin,
    isLoadingLocalLogin,
    isLoadingPhoneLogin,
    isLoadingRegister,
    isLoadingResetForgotPassword,
    isResetForgotPasswordSuccessful
  }
}

function useAccountActivation() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { activationStatus } = useSelector((state) => state.authentication);

  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const defaultValues = account_activation_default_values;
  const resolver = yupResolver(send_email_schema)
  const methods = useForm({ defaultValues, resolver });

  useEffect(() => {
    if (token) {
      dispatch(activateAccount(token));
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
    activationStatus,
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
    dispatch(clearError('authError'))

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

  const defaultValues = account_activation_default_values;
  const resolver = yupResolver(send_email_schema)
  const methods = useForm({ defaultValues, resolver });

  function onSubmitEmail(data) {
    const { email } = data;
    dispatch(getPasswordResetEmail(email))
  }

  return {
    FormProvider,
    methods,
    onSubmitEmail,
  }
}

function useResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();

  const defaultValues = password_reset_default_values;
  const resolver = yupResolver(password_reset_schema)
  const methods = useForm({ defaultValues, resolver });

  function onSubmitNewPassword(data) {
    const { newPassword } = data;
    dispatch(resetForgotPassword(newPassword, token))
  }

  return {
    FormProvider,
    methods,
    onSubmitNewPassword
  }
}

function useRegister() {
  const dispatch = useDispatch();
  const { appActionStatus } = useSelector((state) => state.app)

  const defaultValues = register_default_values;
  const resolver = yupResolver(register_schema)
  const methods = useForm({ defaultValues, resolver });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearAppActionStatus())
    }
  }, [])

  useEffect(() => {
    if (appActionStatus === 'registrationSuccess') {
      setShowModal(true);
    }
  }, [appActionStatus])

  function onRegister(data) {
    const { firstName, lastName, email, password } = data;
    dispatch(register(firstName, lastName, email, password));
  };

  function onGoogleLogin() {
    dispatch(googleLogin());
  }

  function closeModal() {
    setShowModal(false)
  }

  const localRegisterProps = {
    FormProvider,
    methods,
    onRegister
  }

  return {
    closeModal,
    showModal,
    onGoogleLogin,
    localRegisterProps,
  }
}

export {
  useAuthentication,
  useAccountActivation,
  useLogin,
  useForgotPassword,
  useResetPassword,
  useRegister
}
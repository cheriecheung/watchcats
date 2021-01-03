import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAccountDetails,
  changeNotification,
  submitPhoneNumber,
  deletePhoneNumber,
  verifyPhoneNumber,
  resendOtpToInputtedPhoneNumber,
  sendOtpToSavedPhoneNumber
} from '../../../redux/account/actions';
import {
  clearAppActionStatus,
  resetPassword,
  getGoogleAuthenticatorQrCode,
  enableTwoFactor,
  disableTwoFactor
} from '../../../redux/app/actions'
import { clearError } from '../../../redux/error/actions'
import { clearLoading } from '../../../redux/loading/actions'
import { onboardUser } from '../../../redux/payment/actions'
import ERROR from '../../../constants/errorTypes'
import LOADING from '../../../constants/loadingTypes'

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_password_default_values } from '../_formConfig/_defaultValues'
import { reset_password_schema } from '../_formConfig/_validationSchema'

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function useSettings() {
  const { t } = useTranslation();
  const { appError, accountError } = useSelector((state) => state.error);
  const { appLoading, accountLoading, paymentLoading } = useSelector((state) => state.loading);

  let isLoadingChangePassword = appLoading === LOADING.CHANGE_PASSWORD
  let isLoadingDisable2fa = appLoading === LOADING.DISABLE_2FA
  let isLoadingEnable2fa = appLoading === LOADING.ENABLE_2FA
  let isLoadingSendSmsOtp = accountLoading === LOADING.SEND_SMS_OTP
  let isLoadingSetPayouts = paymentLoading === LOADING.TO_SETUP_PAYOUTS
  let isLoadingSubmitPhoneNumber = accountLoading === LOADING.SUBMIT_PHONE_NUMBER
  let isLoadingVerifyPhoneNumber = accountLoading === LOADING.VERIFY_PHONE_NUMBER
  let hasSetEmailNotificationError = accountError === ERROR.SET_EMAIL_NOTIFICATION_FAILED
  let hasSetPhoneNotificationError = accountError === ERROR.SET_PHONE_NOTIFICATION_FAILED

  return {
    t,
    appError,
    accountError,
    hasSetEmailNotificationError,
    hasSetPhoneNotificationError,
    isLoadingChangePassword,
    isLoadingDisable2fa,
    isLoadingEnable2fa,
    isLoadingSendSmsOtp,
    isLoadingSetPayouts,
    isLoadingSubmitPhoneNumber,
    isLoadingVerifyPhoneNumber
  }
}

function usePaymentSetup() {
  const dispatch = useDispatch();
  const { hasSetUpStripAccount } = useSelector((state) => state.account);

  function onHandleOnboardUser() {
    dispatch(onboardUser())
  }

  function onOpenStripeLoginPage() {
    window.open('https://dashboard.stripe.com/login');
  }

  return {
    hasSetUpStripAccount,
    onHandleOnboardUser,
    onOpenStripeLoginPage
  }
}

function useContactDetails() {
  const dispatch = useDispatch();
  const contactDetails = useSelector((state) => state.account);
  const {
    email: emailValue,
    getEmailNotification,
    phone: phoneValue,
    getSmsNotification,
    changePhoneNumberStep
  } = contactDetails

  const prevSettings = usePrevious({ getEmailNotification, getSmsNotification });

  const [email, setEmail] = useState(null);
  const [asteriskedEmail, setAsteriskedEmail] = useState('')
  const [revealEmail, setRevealEmail] = useState(false);

  const [phone, setPhone] = useState(null)
  const [asteriskedPhone, setAsteriskedPhone] = useState('')
  const [revealPhone, setRevealPhone] = useState(false);

  const [inputPhoneNumber, setInputPhoneNumber] = useState('')

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAccountDetails());
  }, [])

  useEffect(() => {
    if (contactDetails) {
      setEmail(emailValue);

      const asteriskedEmailName = emailValue.substr(0, emailValue.indexOf('@')).replace(/./g, '*');
      const emailDomain = emailValue.substr(emailValue.indexOf("@") + 1);
      setAsteriskedEmail(`${asteriskedEmailName}@${emailDomain}`)

      if (phoneValue) {
        setPhone(phoneValue)

        const withoutLastFourDigits = phoneValue.slice(0, -4).replace(/./g, '*')
        const lastFourDigits = phoneValue.substr(phoneValue.length - 4);
        setAsteriskedPhone(`${withoutLastFourDigits}${lastFourDigits}`)
      }
    }
  }, [contactDetails])

  useEffect(() => {
    if (phone) {
      setPhone(phone)

      const withoutLastFourDigits = phone.slice(0, -4).replace(/./g, '*')
      const lastFourDigits = phone.substr(phone.length - 4);
      setAsteriskedPhone(`${withoutLastFourDigits}${lastFourDigits}`)
    }
  }, [phone])

  useEffect(() => {
    if (changePhoneNumberStep === 'removed') {
      setPhone('')
    }
    if (changePhoneNumberStep === 'verified') {
      setPhone(inputPhoneNumber)
    }
    if (changePhoneNumberStep === 'input') {
      setInputPhoneNumber('')
    }
  }, [changePhoneNumberStep])

  function onSubmitPhoneNumber() {
    dispatch(submitPhoneNumber(inputPhoneNumber))
  }

  function onChangeNotification(contactType) {
    dispatch(changeNotification(contactType));
  }

  function onHandlePhoneNumber(action) {
    if (action === 'add' || action === 'edit') {
      dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
    }
    if (action === 'remove') {
      const isResend = false;
      dispatch(sendOtpToSavedPhoneNumber(isResend))
      dispatch({ type: 'VERIFY_PHONE_NUMBER', payload: 'verifyToRemove' });
    }

    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setInputPhoneNumber('')
    dispatch(clearError('accountError'))
    dispatch(clearLoading('accountLoading'))
  }

  const emailProps = {
    email,
    revealEmail,
    setRevealEmail,
    asteriskedEmail,
    getEmailNotification,
  }

  const phoneProps = {
    phone,
    revealPhone,
    setRevealPhone,
    asteriskedPhone,
    getSmsNotification,
  }

  const phoneNumberInputProps = {
    changePhoneNumberStep,
    inputPhoneNumber,
    setInputPhoneNumber,
    onSubmitPhoneNumber
  }

  return {
    showModal,
    setShowModal,
    closeModal,
    onHandlePhoneNumber,
    onChangeNotification,
    prevSettings,
    emailProps,
    phoneProps,
    phoneNumberInputProps,
  };
}

function usePhoneNumberVerification() {
  const dispatch = useDispatch();
  const { changePhoneNumberStep } = useSelector((state) => state.account);

  const methods = useForm({ defaultValues: { otp: '' } });
  const { watch } = methods;

  function onSubmitOtp(phone) {
    // const { otp, phone } = data;
    const otp = watch('otp')

    if (changePhoneNumberStep === 'verifyToRemove') {
      dispatch(deletePhoneNumber(otp));
    } else {
      dispatch(verifyPhoneNumber(otp, phone))
    }
  }

  function resendCode(phone) {
    if (changePhoneNumberStep === 'verifyToRemove') {
      const isResend = true;
      dispatch(sendOtpToSavedPhoneNumber(isResend))
    } else {
      dispatch(resendOtpToInputtedPhoneNumber(phone))
    }
  }

  return {
    FormProvider,
    methods,
    onSubmitOtp,
    resendCode
  }
}

function useAuthentication() {
  const dispatch = useDispatch();

  const { isTwoFactorEnabled, isGoogleLogin } = useSelector((state) => state.account);
  const { appActionStatus } = useSelector((state) => state.app);

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('')

  useEffect(() => {
    if (appActionStatus) {
      setContent(appActionStatus)
    }
  }, [appActionStatus])

  function showChangePasswordModal() {
    setShowModal(true)
    setContent('resetPassword')
  }

  function showEnable2faModal() {
    setShowModal(true)
    dispatch(getGoogleAuthenticatorQrCode())
    setContent('enable2FA')
  }

  function showDisable2faModal() {
    setShowModal(true)
    setContent('disable2FA')
  }

  function closeModal() {
    setShowModal(false)
    dispatch(clearError('authError'))
    dispatch(clearAppActionStatus())
  }

  return {
    isTwoFactorEnabled,
    isGoogleLogin,
    appActionStatus,
    showChangePasswordModal,
    showEnable2faModal,
    showDisable2faModal,
    showModal,
    closeModal,
    content
  }
}

function useEnable2FA() {
  const dispatch = useDispatch();

  const { appError } = useSelector((state) => state.error)
  const { qrCode } = useSelector((state) => state.app);

  const methods = useForm();
  const { watch, reset } = methods;

  const [qrCodeImage, setQrCodeImage] = useState('')

  const onVerifyCode = () => {
    const code = watch('verificationCode')
    dispatch(enableTwoFactor(code))
  }

  useEffect(() => {
    if (qrCode) {
      setQrCodeImage(qrCode)
    }
  }, [qrCode])

  useEffect(() => {
    if (appError === '') {
      reset({ verificationCode: '' })
    }
  }, [appError])

  return {
    FormProvider,
    methods,
    qrCodeImage,
    onVerifyCode,
  }
}

function useDisable2FA() {
  const dispatch = useDispatch();
  const methods = useForm();

  function onSubmit(data) {
    const { code } = data;
    dispatch(disableTwoFactor(code))
  }

  return {
    FormProvider,
    methods,
    onSubmit,
  }
}

function useChangePassword() {
  const dispatch = useDispatch();

  const defaultValues = reset_password_default_values;
  const resolver = yupResolver(reset_password_schema)
  const methods = useForm({ defaultValues, resolver });

  function onSubmit(data) {
    const { currentPassword, newPassword } = data;
    dispatch(resetPassword(currentPassword, newPassword))
  }

  return {
    FormProvider,
    methods,
    onSubmit,
  }
}

export {
  useSettings,
  usePrevious,
  usePaymentSetup,
  useContactDetails,
  usePhoneNumberVerification,
  useAuthentication,
  useEnable2FA,
  useDisable2FA,
  useChangePassword
};
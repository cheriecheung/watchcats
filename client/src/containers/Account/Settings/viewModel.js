import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  getContactDetails,
  changeNotification,
  submitPhoneNumber,
  deletePhoneNumber,
  verifyPhoneNumber,
  resendVerficationCode
} from '../../../redux/actions/accountActions';
import {
  resetPassword,
  getGoogleAuthenticatorQrCode,
  verifyGoogleAuthenticatorCode,
  disableTwoFactor
} from '../../../redux/actions/authenticationActions'

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_password_schema, reset_password_default_values } from '../_formConfig'

function useContactDetails() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const contactDetails = useSelector((state) => state.account);
  const { email: emailValue, getEmailNotification, phone: phoneValue, getSmsNotification, changePhoneNumberStep } = contactDetails

  const [email, setEmail] = useState(null);
  const [asteriskedEmail, setAsteriskedEmail] = useState('')
  const [revealEmail, setRevealEmail] = useState(false);

  const [phone, setPhone] = useState(null)
  const [asteriskedPhone, setAsteriskedPhone] = useState('')
  const [revealPhone, setRevealPhone] = useState(false);

  const [inputPhoneNumber, setInputPhoneNumber] = useState('')

  useEffect(() => {
    dispatch(getContactDetails());
  }, [dispatch])

  useEffect(() => {
    if (contactDetails) {
      // const { email, phone } = contactDetails;

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
      dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
      setPhone('')
    }
    if (changePhoneNumberStep === 'verified') {
      setPhone(inputPhoneNumber)
    }
    if (changePhoneNumberStep === 'input') {
      setInputPhoneNumber('')
    }
  }, [changePhoneNumberStep])

  function savePhoneNumber() {
    dispatch(submitPhoneNumber(inputPhoneNumber))
  }

  function deletePhone() {
    dispatch(deletePhoneNumber(phone));
  }

  function onChangeNotification(contactType) {
    dispatch(changeNotification(contactType));
  }

  const contactDetailsDisplayProps = {
    onChangeNotification,
    email,
    asteriskedEmail,
    getEmailNotification,
    phone,
    asteriskedPhone,
    getSmsNotification,
    revealEmail,
    setRevealEmail,
    revealPhone,
    setRevealPhone,
    deletePhone
  }

  const phoneNumberInputProps = {
    changePhoneNumberStep,
    inputPhoneNumber,
    setInputPhoneNumber,
    savePhoneNumber
  }

  return {
    t,
    contactDetailsDisplayProps,
    phoneNumberInputProps,
  };
}

function usePhoneNumberVerification() {
  const dispatch = useDispatch();

  const defaultValues = { otp: '' }
  const methods = useForm({ defaultValues });

  function onSubmitOtp(data) {
    const { otp } = data;
    dispatch(verifyPhoneNumber(otp))
  }

  function resendCode() {
    dispatch(resendVerficationCode())
  }

  return {
    FormProvider,
    methods,
    onSubmitOtp,
    resendCode
  }
}

function usePasswordAndAuthentication() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { contactDetails } = useSelector((state) => state.account);
  const { isActivated } = useSelector((state) => state.two_factor_auth);

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('')

  useEffect(() => {
    if (isActivated) {
      setContent('enableSuccess')
    }
  }, [isActivated])

  function showChangePasswordModal() {
    setShowModal(true)
    setContent('changePassword')
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
  }

  return {
    t,
    contactDetails,
    isActivated,
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

  const { qrCode } = useSelector((state) => state.two_factor_auth);

  const methods = useForm();
  const { watch } = methods;

  const [qrCodeImage, setQrCodeImage] = useState('')

  const onVerifyCode = () => {
    const code = watch('verificationCode')
    dispatch(verifyGoogleAuthenticatorCode(code))
  }

  useEffect(() => {
    if (qrCode) {
      setQrCodeImage(qrCode)
    }
  }, [qrCode])

  return {
    FormProvider,
    methods,
    qrCodeImage,
    onVerifyCode
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
    onSubmit
  }
}

function useChangePassword() {
  const dispatch = useDispatch();

  const defaultValues = reset_password_default_values;
  const resolver = yupResolver(reset_password_schema)
  const methods = useForm({ defaultValues, resolver });

  function onSubmit(data) {
    const { newPassword } = data;
    dispatch(resetPassword(newPassword))
  }

  return {
    FormProvider,
    methods,
    onSubmit
  }
}

export {
  useContactDetails,
  usePhoneNumberVerification,
  usePasswordAndAuthentication,
  useEnable2FA,
  useDisable2FA,
  useChangePassword
};
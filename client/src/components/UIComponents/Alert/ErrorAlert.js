import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Alert } from 'antd';
import { clearAllErrors } from '../../../redux/error/actions'
import ERROR from '../../../constants/errorTypes'

function renderMessage(t, type) {
  switch (type) {
    case ERROR.EMAIL_ALREADY_EXISTS:
      return t('api_error.email_exists')
    case ERROR.LOGIN_FAILED:
      return t('api_error.login_failed')
    case ERROR.LOGIN_CREDENTIALS_INVALID:
      return t('api_error.login_credentials_invalid')
    case ERROR.PHONE_VERIFICATION_FAILED:
      return t('api_error.code_verify_failed')
    case ERROR.PHONE_SAVING_FAILED:
      return t('api_error.phone_saving_failed')
    case ERROR.PHONE_ALREADY_EXISTS:
      return t('api_error.phone_exists')
    case ERROR.PHONE_SUBMISSION_FAILED:
      return t('api_error.phone_submission_failed')
    case ERROR.PASSOWORD_RESET_FAILED:
      return t('api_error.password_reset_failed')
    case ERROR.OTP_EXPIRED:
      return t('api_error.otp_expired')
    case ERROR.OTP_INVALID:
    case ERROR.GOOGLE_OTP_INVALID:
      return t('api_error.otp_invalid')
    case ERROR.TWO_FACTOR_ACTIVATION_FAILED:
      return t('api_error.two_factor_activation_failed')
    case ERROR.PASSWORD_INCORRECT:
      return t('api_error.password_incorrect')
    case ERROR.SET_EMAIL_NOTIFICATION_FAILED:
    case ERROR.SET_PHONE_NOTIFICATION_FAILED:
      return t('api_error.generic')
    default:
      return t('api_error.generic')
  }
}

function ErrorAlert({ type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const message = renderMessage(t, type)

  return (
    <Alert
      type="error"
      message={message}
      style={{ margin: '20px 0' }}
      showIcon
      closable
      onClose={() => dispatch(clearAllErrors())}
    />
  )
}

export default ErrorAlert;
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'antd';

function renderMessage(t, type) {
  switch (type) {
    case 'ERROR/EMAIL_ALREADY_EXISTS':
      return t('error.email_exists')
    case 'ERROR/LOGIN_FAILED':
      return t('error.login_failed')
    case 'ERROR/LOGIN_CREDENTIALS_INVALID':
      return t('error.login_credentials_invalid')
    case 'ERROR/PHONE_VERIFICATION_FAILED':
      return t('error.code_verify_failed')
    case 'ERROR/PHONE_SAVING_FAILED':
      return t('error.phone_saving_failed')
    case 'ERROR/PHONE_ALREADY_EXISTS':
      return t('error.phone_exists')
    case 'ERROR/PHONE_SUBMISSION_FAILED':
      return t('error.phone_submission_failed')
    case 'ERROR/PASSOWORD_RESET_FAILED':
      return t('error.password_reset_failed')
    case 'ERROR/OTP_INVALID':
    case 'ERROR/GOOGLE_OTP_INVALID':
      return t('error.otp_invalid')
    case 'ERROR/2FA_ACTIVATION_FAILED':
      return t('error.two_factor_activation_failed')
    default:
      return t('error.generic')
  }
}

function ErrorMessage({ type }) {
  const { t } = useTranslation();
  const message = renderMessage(t, type)

  return (
    <Alert
      message={message}
      type="error"
      showIcon
      style={{ marginTop: 30 }}
    />
  )
}

export default ErrorMessage;
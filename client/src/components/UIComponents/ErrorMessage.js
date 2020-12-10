import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ErrorMessageComponent = styled.p`
  color: #E56E5A;
  align-self: flex-end;
`

function renderMessage(t, type) {
  switch (type) {
    case 'ERROR/PHONE_VERIFICATION_FAILED':
      return t('error.code_verify_failed')
    case 'ERROR/PHONE_SAVING_FAILED':
      return t('error.phone_save_failed')
    case 'ERROR/PHONE_ALREADY_EXISTS':
      return t('error.phone_exists')
    case 'ERROR/PHONE_SUBMISSION_FAILED':
      return t('error.phone_submit_failed')
    case 'ERROR/OTP_INVALID':
    case 'ERROR/PASSOWORD_RESET_FAILED':
      return t('error.password_reset_failed')
    case 'ERROR/GOOGLE_OTP_INVALID':
      return t('error.otp_invalid')
    case 'ERROR/2FA_ACTIVATION_FAILED':
      return t('error.activation_failed')
    default:
      return t('error.generic')
  }
}

function ErrorMessage({ type }) {
  const { t } = useTranslation();

  return (
    <ErrorMessageComponent>{renderMessage(t, type)}</ErrorMessageComponent>
  )
}

export default ErrorMessage;
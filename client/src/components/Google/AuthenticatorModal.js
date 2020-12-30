import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { OtpInput } from '../FormComponents'
import {
  ContainedButton,
  ErrorAlert,
  Image,
  ImageContainer,
  Spinner
} from '../UIComponents'

function AuthenticatorModal({ name, error, isLoading }) {
  const { t } = useTranslation();

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ImageContainer style={{ width: 80, height: 80 }}>
          <Image url="https://whooptous.com/wp-content/uploads/2020/05/unnamed.png" />
        </ImageContainer>

        <br />
        <p style={{ textAlign: 'center' }}>
          {t('login.2FA_login')}
        </p>

        <OtpInput name={name} />
      </div>

      <br />

      {error && <ErrorAlert type={error} />}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ContainedButton type="submit">
          {t('form.submit')}
          {isLoading && <Spinner />}
        </ContainedButton>
      </div>
    </>
  )
}

export default AuthenticatorModal;

AuthenticatorModal.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
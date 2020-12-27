import React from 'react';
import { OtpInput } from '../FormComponents'
import {
  ContainedButton,
  ErrorMessage,
  Image,
  ImageContainer,
  Spinner
} from '../UIComponents'

function AuthenticatorModal({ t, name, error, isLoading }) {
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

      {error && <ErrorMessage type={error} />}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ContainedButton type="submit">
          {t('form.submit')}
          {isLoading && <Spinner />}
        </ContainedButton>
      </div>
    </>
  )
}

export default AuthenticatorModal
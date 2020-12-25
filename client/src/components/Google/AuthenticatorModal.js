import React from 'react';
import { OtpInput } from '../FormComponents'
import { ContainedButton, ErrorMessage, Image, ImageContainer } from '../UIComponents'

function AuthenticatorModal({ name, error }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ImageContainer>
          <Image url="https://whooptous.com/wp-content/uploads/2020/05/unnamed.png" />
        </ImageContainer>

        <br />
        <p style={{ textAlign: 'center' }}>Enter the 6-digit code in the Google Authenticator app on your phone.</p>

        <OtpInput name={name} />
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ContainedButton type="submit">Submit</ContainedButton>
      </div>

      {error && <ErrorMessage type={error} />}
    </>
  )
}

export default AuthenticatorModal
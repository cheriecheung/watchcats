import React from 'react';
import { FieldLabel, TextField } from '../../../../components/FormComponents';
import { ContainedButton, ErrorMessage, Image, ImageContainer, LinkButton } from '../../../../components/UIComponents';
import styled from 'styled-components'

import { useEnable2FA } from '../viewModel';

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  margin-bottom: 0;
  flex: 50%;
`;

function Enable2FA({ t }) {
  const {
    FormProvider,
    methods,
    qrCodeImage,
    onVerifyCode,
    appError
  } = useEnable2FA();

  return (
    <FormProvider {...methods}>
      <form style={{ textAlign: 'left' }}>

        <p>Make your account safer in three easy steps:</p>

        <Section>
          <ImageContainer>
            <Image url="https://whooptous.com/wp-content/uploads/2020/05/unnamed.png" />
          </ImageContainer>
          <Description>
            <FieldLabel>1. Download an authenticator app</FieldLabel>
            <p>
              Download and install <LinkButton to="https://support.google.com/accounts/answer/1066447?hl=en" target="_blank">Google Authenticator</LinkButton> for your phone or tablet.
                         </p>
          </Description>
        </Section>

        <hr style={{ marginTop: '-10px' }} />

        <Section>
          <ImageContainer>
            <Image url={qrCodeImage} />
          </ImageContainer>
          <Description>
            <FieldLabel>2. Scan the QR code</FieldLabel>
            <p>
              Open the authenticator app and scan the image to the left using your phone's camera.
             </p>
          </Description>
        </Section>

        <hr />

        <Section>
          <ImageContainer>
            <i className="fas fa-mobile-alt fa-4x mb-3" />
          </ImageContainer>
          <Description>
            <FieldLabel>3. Login with your code</FieldLabel>
            <p>Enter the 6-digit verification code generated.</p>

            <TextField name="verificationCode" placeholder="000 000" />
            <ContainedButton type="button" onClick={onVerifyCode}>Activate</ContainedButton>

            {appError && <ErrorMessage type={appError} />}
          </Description>
        </Section>
      </form>
    </FormProvider>
  )
}

export default Enable2FA
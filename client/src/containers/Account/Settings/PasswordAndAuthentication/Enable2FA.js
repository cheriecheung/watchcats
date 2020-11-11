import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyGoogleAuthenticatorCode } from '../../../../redux/actions/authenticationActions'
import { TextField } from '../../../../components/FormComponents';
import styled from 'styled-components'

import { useForm, FormProvider } from 'react-hook-form';

const Container = styled.div`
     display: flex;
    flex-wrap: wrap;
`;

const Picture = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  margin-bottom: 0;
  flex: 50%;
`;

function Enable2FA() {
  const dispatch = useDispatch();
  const { qrCode } = useSelector((state) => state.two_factor_auth);

  const methods = useForm();
  const { handleSubmit, watch } = methods;

  const [qrCodeImage, setQrCodeImage] = useState('')

  const onSubmit = (data) => {
    console.log({ data })
  }

  useEffect(() => {
    if (qrCode) {
      setQrCodeImage(qrCode)
    }
  }, [qrCode])

  const onVerifyCode = () => {
    console.log(watch('verificationCode'))
    const code = watch('verificationCode')
    dispatch(verifyGoogleAuthenticatorCode(code))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>

        <p>Make your account safer in three easy steps:</p>

        <Container>
          <Picture>
            <img src="https://whooptous.com/wp-content/uploads/2020/05/unnamed.png" style={{ objectFit: 'contain', width: '80%', height: 'auto' }} />
          </Picture>
          <Description>
            <div style={{ display: 'flex' }}>
              <h6>1.</h6>&nbsp;
                            <b>Download an authenticator app</b>
            </div>
            <p>
              Download and install <a href="https://support.google.com/accounts/answer/1066447?hl=en">Google Authenticator</a> for your phone or tablet.
                         </p>
          </Description>
        </Container>

        <hr style={{ marginTop: '-10px' }} />

        <Container>
          <Picture>
            <img src={qrCodeImage} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} />
          </Picture>
          <Description>
            <div style={{ display: 'flex' }}>
              <h6>2.</h6>&nbsp;
                            <b>Scan the QR code</b>
            </div>
            <p>
              Open the authenticator app and scan the image to the left using your phone's camera.
                        </p>
            {/* <span>2FA Key (manual entry)</span>
                        <span>XXXX XXXX XXXX XXXX</span> */}
          </Description>
        </Container>

        <hr />

        <Container>
          <Picture>
            <i className="fas fa-mobile-alt fa-4x mb-3" />

          </Picture>
          <Description>
            <div style={{ display: 'flex' }}>
              <h6>3.</h6>&nbsp;
                            <b>Login with your code</b>
            </div>
            <p>Enter the 6-digit verification code generated.</p>
            <TextField name="verificationCode" placeholder="000 000" />
            <button onClick={onVerifyCode}>Activate</button>
          </Description>
        </Container>
      </form>
    </FormProvider>
  )
}

export default Enable2FA

export function EnableSuccess({ closeModal }) {
  return (
    <>
      <i className="far fa-check-circle fa-3x" />
      <br />
      <br />
      <p>You have successfully activated 2FA</p>
      <button onClick={() => {
        closeModal && closeModal()
      }}>OK</button>
    </>
  )
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoogleAuthenticatorQrCode, resetPassword, verifyGoogleAuthenticatorCode } from '../../../redux/actions/authenticationActions'
import { useTranslation } from 'react-i18next';

import styled from 'styled-components'
import { Row, Col, Button } from 'reactstrap';
import { Input } from 'antd';
import { FieldLabel, PasswordField, SectionContainer, SectionTitle, TextField } from '../../../components/FormComponents';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_password_default_values as defaultValues } from '../_defaultValues'
import { reset_password_schema } from '../_validationSchema'

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

const AntInput = styled(Input.Password)`
    margin-bottom: 20px;
`

function PasswordAndAuthentication({ setModalTitle, setModalContent, closeModal }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onEnable2FA = () => {
        dispatch(getGoogleAuthenticatorQrCode())

        setModalTitle('Enable Two Factor Authnetication')
        setModalContent(<Enable2FA />)
    }

    return (
        <>
            {/* disable if registered / signed in by google */}
            <Button
                color="info"
                size="sm"
                onClick={() => {
                    setModalTitle('Change your password')
                    setModalContent(<ChangePassword closeModal={closeModal} />)
                }}
            >
                {t('settings.change_password')}
            </Button>

            <h6 style={{ marginTop: 40 }}>Two-Factor Authentication</h6>
            (Only for accounts registered by email and password)
            <p>
                Protect your account with an extra layer of security. Once configured, you'll be required
                to enter both your password and an authentication code from your mobile phone in order to
                sign in
            </p>

            {/* disable button if register via google */}
            <Button
                color="info"
                size="sm"
                type="button"
                onClick={onEnable2FA}
            >
                Enable Two-Factor Auth
            </Button>
        </>
    )
}

export default PasswordAndAuthentication

const resolver = yupResolver(reset_password_schema)

function ChangePassword({ closeModal }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const methods = useForm({ defaultValues, resolver });
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        console.log({ data })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>

                <FieldLabel> {t('settings.current_password')}</FieldLabel>
                <PasswordField name="currentPassword" />

                <FieldLabel> {t('settings.new_password')}</FieldLabel>
                <PasswordField name="newPassword" />

                <FieldLabel> {t('settings.repeat_new_password')}</FieldLabel>
                <PasswordField name="newPasswordRepeat" />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" onClick={() => dispatch(resetPassword())}>Submit</button>
                </div>
            </form>
        </FormProvider>
    )
}

function Enable2FA() {
    const dispatch = useDispatch();
    const { qrCode } = useSelector((state) => state.two_factor_auth);

    const methods = useForm({ defaultValues });
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
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FieldLabel, TextField, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import { Row, Col, Button } from 'reactstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useTranslation } from 'react-i18next';
import { Modal, Input } from 'antd';
import styled from 'styled-components'

const defaultValues = {
    password: ''
}

const defaultModal = {
    show: false,
    loading: false,
    title: '',
    content: '',
}

const AntInput = styled(Input.Password)`
    margin-bottom: 20px;
`

function PasswordAndAuthentication() {
    const { t } = useTranslation();

    const [modal, setModal] = useState(defaultModal);
    const [phoneNumber, setPhoneNumber] = useState()

    return (
        <>
            {/* disable if registered / signed in by google */}
            <Button color="info" size="sm" onClick={() => setModal({ show: true, title: <h5>Change your password</h5>, content: <ChangePassword /> })}>
                {t('settings.change_password')}
            </Button>

            <h6 style={{ marginTop: 40 }}>Enable Two-Factor Auth</h6>
            <p>
                Protect your account with an extra layer of security. Once configured, you'll be required
                to enter both your password and an authentication code from your mobile phone in order to
                sign in
                 </p>

            {/* <Button color="info" size="sm">
                        Enable Two-Factor Auth
                    </Button> */}

            <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
            />

            {/* <FieldLabel>Password</FieldLabel>
            <TextField name="password"></TextField> */}

            <button style={{ background: 'none', border: 'none' }}>Cancel</button>
            <Button color="info" size="sm">
                Continue
                </Button>

            <Modal
                title={modal.title}
                visible={modal.show}
                okText="Confirm"
                onOk={() => setModal({ show: false })}
                onCancel={() => setModal({ show: false })}
            >
                {modal.content}
            </Modal>
        </>
    )
}

export default PasswordAndAuthentication

function ChangePassword() {
    const { t } = useTranslation();

    const methods = useForm({ defaultValues });
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        console.log({ data })
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>

                <FieldLabel> {t('settings.current_password')}</FieldLabel>
                <AntInput />

                <FieldLabel> {t('settings.new_password')}</FieldLabel>
                <AntInput />

                <FieldLabel> {t('settings.repeat_new_password')}</FieldLabel>
                <AntInput />
            </form>
        </FormProvider>
    )
}
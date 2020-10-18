import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { send_email_schema } from '../Account/_validationSchema'
import styled from 'styled-components';
import { TextField } from '../../components/FormComponents'
import { getPasswordResetEmail } from '../../_actions'
import { Alert } from 'antd';

const SubmitButton = styled.button`
  background: #ffa195;
  height: 35px;
  margin-left: 15px;
  padding: 5px 25px;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  outline: none !important;
`;

const defaultValues = { email: '' }

const resolver = yupResolver(send_email_schema)

function ForgotPassword() {
    const dispatch = useDispatch();

    const methods = useForm({ defaultValues, resolver });
    const { handleSubmit } = methods;

    const [emailSubmitted, setEmailSubmitted] = useState(false)

    const onSubmit = (data) => {
        const { email } = data;
        dispatch(getPasswordResetEmail(email))
        setEmailSubmitted(true)
    }


    return (
        <div style={{ width: '30vw', margin: '50px auto 0 auto' }}>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Reset your password</h5>
                    <p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>

                    <br />

                    {emailSubmitted ?
                        <Alert message="If the provided email is in our database, a password reset link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox" type="success" showIcon />
                        :
                        <>
                            <TextField name="email" />
                            <SubmitButton>Submit</SubmitButton>
                        </>
                    }
                </form>
            </FormProvider>
        </div>
    )
}

export default ForgotPassword;
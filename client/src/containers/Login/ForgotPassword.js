import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { send_email_schema } from '../Account/_validationSchema'
import styled from 'styled-components';
import { TextField } from '../../components/FormComponents'

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
    const methods = useForm({ defaultValues, resolver });
    const { handleSubmit, reset, setValue, errors, watch, register } = methods;

    const onSubmit = (data) => {
        console.log({ data })
    }

    return (
        <div style={{ width: '30vw', margin: '50px auto 0 auto' }}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Reset your password</h5>
                    <p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>

                    <TextField name="email" />
                    <SubmitButton>
                        Submit
                    </SubmitButton>
                </form>
            </FormProvider>
        </div>
    )
}

export default ForgotPassword
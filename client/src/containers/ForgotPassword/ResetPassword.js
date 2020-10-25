import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { reset_password_schema } from '../Account/_validationSchema'
import { FieldLabel, TextField } from '../../components/FormComponents'
import { resetPassword } from '../../redux/actions'
import styled from 'styled-components';

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

const defaultValues = {
    newPassword: '',
    newPasswordRepeat: ''
}

const resolver = yupResolver(reset_password_schema)

function ResetPassword() {
    const dispatch = useDispatch();

    const methods = useForm({ defaultValues, resolver });
    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        const { newPassword } = data;
        dispatch(resetPassword(newPassword))
    }

    return (
        <div style={{ width: '30vw', margin: '50px auto 0 auto' }}>
            <h5>Reset your password</h5>
            <p>Please enter your new password</p>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldLabel>New password</FieldLabel>
                    <TextField name="newPassword" />

                    <FieldLabel>Repeat password</FieldLabel>
                    <TextField name="newPasswordRepeat" />

                    <SubmitButton>Submit</SubmitButton>
                </form>
            </FormProvider>
        </div>
    )
}

export default ResetPassword;
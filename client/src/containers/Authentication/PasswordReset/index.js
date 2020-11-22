import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    password_reset_default_values as defaultValues,
    password_reset_schema
} from '../_formConfig'
import { FieldLabel, TextField } from '../../../components/FormComponents'
import { ContainedButton } from '../../../components/UIComponents';
import { useForgotPassword } from '../viewModel';

const resolver = yupResolver(password_reset_schema)

function PasswordReset() {
    const methods = useForm({ defaultValues, resolver });
    const { handleSubmit } = methods;

    const { onSubmitNewPassword } = useForgotPassword();

    return (
        <div style={{ width: '30vw', margin: '50px auto 0 auto' }}>
            <h5>Reset your password</h5>
            <p>Please enter your new password</p>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                    <FieldLabel>New password</FieldLabel>
                    <TextField name="newPassword" />

                    <FieldLabel>Repeat password</FieldLabel>
                    <TextField name="newPasswordRepeat" />

                    <ContainedButton>Submit</ContainedButton>
                </form>
            </FormProvider>
        </div>
    )
}

export default PasswordReset;
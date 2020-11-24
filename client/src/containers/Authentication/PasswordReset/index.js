import React from 'react'
import { FieldLabel, TextField } from '../../../components/FormComponents'
import { ContainedButton } from '../../../components/UIComponents';
import { useResetPassword } from '../viewModel';

function PasswordReset() {
    const {
        t,
        FormProvider,
        methods,
        onSubmitNewPassword
    } = useResetPassword();

    const { handleSubmit } = methods;

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
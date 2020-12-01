import React from 'react'
import { FieldLabel, TextField } from '../../../components/FormComponents'
import { ContainedButton, VerticalCard } from '../../../components/UIComponents';
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
        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <VerticalCard variant="authentication">
                <h4>Reset your password</h4>
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
            </VerticalCard>
        </div>
    )
}

export default PasswordReset;
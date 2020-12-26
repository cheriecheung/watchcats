import React from 'react'
import { FieldLabel, TextField } from '../../../components/FormComponents'
import { ContainedButton, VerticalCard } from '../../../components/UIComponents';
import { useAuthentication, useResetPassword } from '../viewModel';

function PasswordReset() {
    const { t, appError } = useAuthentication()
    const {
        FormProvider,
        methods,
        onSubmitNewPassword
    } = useResetPassword();

    const { handleSubmit } = methods;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <VerticalCard variant="authentication">
                <h5>{t('reset_password.title')}</h5>
                <p>{t('reset_password.enter_new_password')}</p>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                        <FieldLabel>{t('reset_password.new_password')}</FieldLabel>
                        <TextField name="newPassword" />

                        <FieldLabel>{t('reset_password.repeat_password')}</FieldLabel>
                        <TextField name="newPasswordRepeat" />

                        <ContainedButton>{t('form.submit')}</ContainedButton>
                    </form>
                </FormProvider>
            </VerticalCard>
        </div>
    )
}

export default PasswordReset;
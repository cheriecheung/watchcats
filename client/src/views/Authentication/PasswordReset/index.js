import React from 'react'
import { FieldLabel, PasswordField } from '../../../components/FormComponents'
import {
    Alert,
    ContainedButton,
    ErrorMessage,
    Spinner,
    VerticalCard
} from '../../../components/UIComponents';
import { useAuthentication, useResetPassword } from '../viewModel';

function PasswordReset() {
    const {
        t,
        appError,
        isLoadingResetForgotPassword,
        isResetForgotPasswordSuccessful
    } = useAuthentication();

    const {
        FormProvider,
        methods,
        onSubmitNewPassword,
    } = useResetPassword();

    const { handleSubmit } = methods;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <VerticalCard variant="authentication">
                <h5>{t('reset_password.title')}</h5>
                <p>{t('reset_password.enter_new_password')}</p>
                {/* password requirement */}

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                        <FieldLabel>{t('reset_password.new_password')}</FieldLabel>
                        <PasswordField name="newPassword" />

                        <FieldLabel>{t('reset_password.repeat_password')}</FieldLabel>
                        <PasswordField name="newPasswordRepeat" />

                        {appError && <ErrorMessage type={appError} />}
                        {isResetForgotPasswordSuccessful &&
                            <Alert type="success" style={{ marginBottom: 15 }}>
                                {t('success.reset_forgot_password')}
                            </Alert>
                        }

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <ContainedButton type="submit">
                                {t('form.submit')}
                                {isLoadingResetForgotPassword && <Spinner />}
                            </ContainedButton>
                        </div>
                    </form>
                </FormProvider>
            </VerticalCard>
        </div>
    )
}

export default PasswordReset;
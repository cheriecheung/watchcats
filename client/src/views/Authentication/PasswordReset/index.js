import React from 'react'
import { FieldLabel, PasswordField } from '../../../components/FormComponents'
import {
    CardTitle,
    ContainedButton,
    ErrorAlert,
    PasswordCriteriaList,
    Spinner,
    SuccessAlert,
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
                <CardTitle>{t('reset_password.title')}</CardTitle>
                <PasswordCriteriaList />

                {isResetForgotPasswordSuccessful ?
                    <SuccessAlert
                        message={t('success.reset_forgot_password')}
                        style={{ marginBottom: 15 }}
                    />
                    :
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                            <FieldLabel>{t('reset_password.new_password')}</FieldLabel>
                            <PasswordField name="newPassword" />

                            <FieldLabel>{t('reset_password.repeat_password')}</FieldLabel>
                            <PasswordField name="newPasswordRepeat" />

                            {appError && <ErrorAlert type={appError} />}

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ContainedButton type="submit">
                                    {t('form.submit')}
                                    {isLoadingResetForgotPassword && <Spinner />}
                                </ContainedButton>
                            </div>
                        </form>
                    </FormProvider>
                }
            </VerticalCard>
        </div>
    )
}

export default PasswordReset;
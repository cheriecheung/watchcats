import React from 'react'
import { Alert, ContainedButton, ErrorMessage, VerticalCard } from '../../../components/UIComponents';
import { TextField } from '../../../components/FormComponents'
import { useAuthentication, useForgotPassword } from '../viewModel';

function PasswordForgotten() {
    const { t, appError } = useAuthentication();
    const {
        FormProvider,
        methods,
        onSubmitEmail,
        appActionStatus
    } = useForgotPassword();

    const { handleSubmit } = methods;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <VerticalCard variant="authentication">
                <h5>{t('reset_password.title')}</h5>
                <p>{t('forgot_password.instruction')}</p>

                <br />

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmitEmail)}>
                        {appActionStatus === 'resetPasswordEmailRequested' ?
                            <Alert type="success">
                                {t('forgot_password.response')}
                            </Alert>
                            :
                            <>
                                <TextField name="email" />
                                {appError && <ErrorMessage type={appError} />}
                                <ContainedButton>{t('form.submit')}</ContainedButton>
                            </>
                        }
                    </form>
                </FormProvider>
            </VerticalCard>
        </div>
    )
}

export default PasswordForgotten;
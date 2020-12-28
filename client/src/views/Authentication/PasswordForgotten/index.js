import React from 'react'
import {
    ContainedButton,
    ErrorAlert,
    SuccessAlert,
    VerticalCard
} from '../../../components/UIComponents';
import { TextField } from '../../../components/FormComponents'
import { useAuthentication, useForgotPassword } from '../viewModel';

function PasswordForgotten() {
    const { t, appActionStatus, appError } = useAuthentication();
    const {
        FormProvider,
        methods,
        onSubmitEmail,
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
                            <SuccessAlert>
                                {t('forgot_password.response')}
                            </SuccessAlert>
                            :
                            <>
                                <TextField name="email" />
                                {appError && <ErrorAlert type={appError} />}

                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <ContainedButton>{t('form.submit')}</ContainedButton>
                                </div>
                            </>
                        }
                    </form>
                </FormProvider>
            </VerticalCard>
        </div>
    )
}

export default PasswordForgotten;
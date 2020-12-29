import React from 'react'
import {
    CardTitle,
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
                <CardTitle>{t('reset_password.title')}</CardTitle>
                <p>{t('forgot_password.instruction')}</p>

                <br />

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmitEmail)}>
                        {appActionStatus === 'resetPasswordEmailRequested' ?
                            <SuccessAlert message={t('forgot_password.response')} />
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
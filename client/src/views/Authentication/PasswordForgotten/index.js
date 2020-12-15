import React from 'react'
import { Alert, ContainedButton, VerticalCard } from '../../../components/UIComponents';
import { TextField } from '../../../components/FormComponents'
import { useAuthentication, useForgotPassword } from '../viewModel';

function PasswordForgotten() {
    const { t, appError } = useAuthentication();
    const {
        FormProvider,
        methods,
        emailSubmitted,
        onSubmitEmail
    } = useForgotPassword();

    const { handleSubmit } = methods;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <VerticalCard variant="authentication">
                <h5>Reset your password</h5>
                <p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>

                <br />

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmitEmail)}>
                        {emailSubmitted ?
                            <Alert type="success">
                                If the provided email is in our database, a password reset link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox
                            </Alert>
                            :
                            <>
                                <TextField name="email" />
                                <ContainedButton>Submit</ContainedButton>
                            </>
                        }
                    </form>
                </FormProvider>
            </VerticalCard>
        </div>
    )
}

export default PasswordForgotten;
import React from 'react'
import { ContainedButton, VerticalCard } from '../../../components/UIComponents';
import { TextField } from '../../../components/FormComponents'
import { Alert } from 'antd';
import { useForgotPassword } from '../viewModel';

function PasswordForgotten() {
    const {
        t,
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
                            <Alert message="If the provided email is in our database, a password reset link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox" type="success" showIcon />
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
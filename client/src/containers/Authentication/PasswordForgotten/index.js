import React from 'react'
import { ContainedButton } from '../../../components/UIComponents';
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
        <div style={{ width: '30vw', margin: '50px auto 0 auto' }}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitEmail)}>
                    <h5>Reset your password</h5>
                    <p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>

                    <br />

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
        </div>
    )
}

export default PasswordForgotten;
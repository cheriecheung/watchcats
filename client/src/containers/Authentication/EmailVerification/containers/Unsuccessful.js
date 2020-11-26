
import React from 'react';
import { Alert } from 'antd';
import { TextField } from '../../../../components/FormComponents'
import { ContainedButton } from '../../../../components/UIComponents';

function Unsuccessful({ t, unsuccessfulProps }) {
  const { FormProvider, methods, onSubmit, emailSubmitted } = unsuccessfulProps
  const { handleSubmit } = methods;

  return (
    <>
      {/* show text when account has already been activated */}

      <h5>Your verification link has expired</h5>
      <p >Please enter your registered email below to get another link to activate your account.</p>
      <br />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {emailSubmitted ?
            <Alert message="If the provided email is in our database, a password reset link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox" type="success" showIcon />
            :
            <>
              <TextField name="email" />
              <ContainedButton>
                Submit
              </ContainedButton>
            </>
          }
        </form>
      </FormProvider>
    </>
  )
}

export default Unsuccessful
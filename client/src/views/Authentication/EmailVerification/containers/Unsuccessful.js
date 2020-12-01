
import React from 'react';
import { TextField } from '../../../../components/FormComponents'
import { Alert, ContainedButton } from '../../../../components/UIComponents';

function Unsuccessful({ t, unsuccessfulProps }) {
  const { FormProvider, methods, onSubmit, emailSubmitted } = unsuccessfulProps
  const { handleSubmit } = methods;

  return (
    <>
      {/* show text when account has already been activated */}

      <h5>Expired or invalid verification link</h5>
      <p >Please enter your registered email below to get another link to activate your account.</p>
      <br />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {emailSubmitted ?
            <Alert type="success">
              If the provided email is in our database, a password reset link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox
            </Alert>
            :
            <>
              <TextField name="email" />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ContainedButton>
                  Submit
              </ContainedButton>
              </div>
            </>
          }
        </form>
      </FormProvider>
    </>
  )
}

export default Unsuccessful
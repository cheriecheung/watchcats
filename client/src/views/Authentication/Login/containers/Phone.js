import React from 'react'
import { AuthenticatorModal } from '../../../../components/Google'

function PhoneLogin({ phoneLoginProps, authenticationError }) {
  const {
    FormProvider,
    phoneLoginMethods: methods,
    onPhoneLogin,
  } = phoneLoginProps;

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onPhoneLogin)}>
        <AuthenticatorModal
          name="code"
          error={authenticationError}
        />
      </form>
    </FormProvider>
  )
}

export default PhoneLogin
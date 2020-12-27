import React from 'react'
import { AuthenticatorModal } from '../../../../components/Google'

function PhoneLogin({
  t,
  authenticationError,
  isLoadingPhoneLogin,
  phoneLoginProps
}) {
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
          t={t}
          name="code"
          error={authenticationError}
          isLoading={isLoadingPhoneLogin}
        />
      </form>
    </FormProvider>
  )
}

export default PhoneLogin
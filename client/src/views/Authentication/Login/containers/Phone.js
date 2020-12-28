import React from 'react'
import { AuthenticatorModal } from '../../../../components/Google'

function PhoneLogin({
  t,
  authError,
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
          error={authError}
          isLoading={isLoadingPhoneLogin}
        />
      </form>
    </FormProvider>
  )
}

export default PhoneLogin
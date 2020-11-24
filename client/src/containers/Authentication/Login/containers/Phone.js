import React from 'react'
import { FieldLabel, OtpInput } from '../../../../components/FormComponents'
import { ContainedButton, HorizontalCard } from '../../../../components/UIComponents'

function PhoneLogin({ t, phoneLoginProps }) {
  const {
    FormProvider,
    phoneLoginMethods: methods,
    onPhoneLogin,
  } = phoneLoginProps;

  const { handleSubmit } = methods;

  return (
    <HorizontalCard style={{ width: '40vw', marginTop: 30 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onPhoneLogin)}>
          <FieldLabel>Code</FieldLabel>
          <OtpInput name="code" />

          <ContainedButton type="submit">submit</ContainedButton>
        </form>
      </FormProvider>
    </HorizontalCard>
  )
}

export default PhoneLogin
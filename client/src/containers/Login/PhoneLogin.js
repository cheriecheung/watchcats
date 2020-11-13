import React from 'react'
import { SectionContainer } from '../../components/FormComponents'
import { useForm, FormProvider } from 'react-hook-form';
import { FieldLabel, TextField } from '../../components/FormComponents'

function PhoneLogin({ onPhoneLogin }) {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <SectionContainer style={{ width: '40vw', marginTop: 30 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onPhoneLogin)}>
          <FieldLabel>Code</FieldLabel>
          <TextField name="code" />

          <button type="submit">submit</button>
        </form>
      </FormProvider>
    </SectionContainer>
  )
}

export default PhoneLogin
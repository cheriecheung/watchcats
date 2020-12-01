import React from 'react'
import { FieldLabel, PasswordField, TextField } from '../../../../components/FormComponents'
import { OutlinedButton } from '../../../../components/UIComponents'

function Local({ t, localRegisterProps }) {
  const { FormProvider, methods, onRegister } = localRegisterProps
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onRegister)}
        style={{ textAlign: 'left' }}
      >
        <FieldLabel>{t('form.first_name')}</FieldLabel>
        <TextField name="firstName" />

        <FieldLabel>{t('form.last_name')}</FieldLabel>
        <TextField name="lastName" />

        <FieldLabel>{t('form.email')}</FieldLabel>
        <TextField name="email" />

        {/* password requirement */}
        <FieldLabel>{t('form.password')}</FieldLabel>
        <PasswordField name="password" />

        <OutlinedButton type="submit" style={{ width: '100%' }}>
          {t('register.register')}
        </OutlinedButton>
      </form>
    </FormProvider>
  )
}

export default Local
import React from 'react'
import { FieldLabel, PasswordField, TextField } from '../../../../components/FormComponents'
import {
  ErrorAlert,
  OutlinedButton,
  PasswordCriteriaList,
  Spinner,
  Tooltip
} from '../../../../components/UIComponents'

function Local({
  t,
  localRegisterProps,
  appError,
  isLoading
}) {
  const { FormProvider, methods, onRegister } = localRegisterProps
  const { handleSubmit } = methods;

  console.log({ appError })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onRegister)}
        style={{ textAlign: 'left' }}
      >
        <FieldLabel>{t('form.first_name')}</FieldLabel>
        <TextField name="firstName" maxLengt={30} />

        <FieldLabel>{t('form.last_name')}</FieldLabel>
        <TextField name="lastName" maxLengt={30} />

        <FieldLabel>{t('form.email')}</FieldLabel>
        <TextField name="email" />

        {/* password requirement */}
        <FieldLabel>{t('form.password')}</FieldLabel>
        <Tooltip content={<PasswordCriteriaList />} />
        <PasswordField name="password" />

        {appError && <ErrorAlert type={appError} />}

        <OutlinedButton type="submit" style={{ width: '100%', marginTop: 10 }}>
          {t('register.title')}
          {isLoading && <Spinner colored={true} />}
        </OutlinedButton>
      </form>
    </FormProvider>
  )
}

export default Local
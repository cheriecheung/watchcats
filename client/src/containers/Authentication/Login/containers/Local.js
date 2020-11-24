import React from 'react'
import { FieldLabel, TextField } from '../../../../components/FormComponents'
import { LinkButton, OutlinedButton } from '../../../../components/UIComponents'

function LocalLogin({ t, localLoginProps }) {
  const {
    FormProvider,
    localLoginMethods: methods,
    onLocalLogin,
    errorMessage
  } = localLoginProps;

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onLocalLogin)}
        style={{ textAlign: 'left', display: 'grid', gridGap: 1 }}
      >
        <FieldLabel>{t('form.email')}</FieldLabel>
        <TextField name="email" />

        <FieldLabel>{t('form.password')}</FieldLabel>
        <TextField name="password" type="password" />

        <LinkButton to="/forgot_password">
          Forgot password?
        </LinkButton>

        <OutlinedButton type="submit">
          {t('login.login')}
        </OutlinedButton>

        {errorMessage && (
          <span style={{ color: 'red' }}>{errorMessage}</span>
        )}
      </form>
    </FormProvider>
  )
}

export default LocalLogin;
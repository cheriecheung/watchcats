import React from 'react'
import { FieldLabel, TextField } from '../../../../components/FormComponents'
import { ErrorMessage, LinkButton, OutlinedButton } from '../../../../components/UIComponents'

function LocalLogin({ t, authenticationError, localLoginProps }) {
  const {
    FormProvider,
    localLoginMethods: methods,
    onLocalLogin,
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

        <LinkButton to="/forgot_password" style={{ textAlign: 'right', marginBottom: 10 }}>
          Forgot password?
        </LinkButton>

        {authenticationError && <ErrorMessage type={authenticationError} />}

        <OutlinedButton type="submit">
          {t('login.login')}
        </OutlinedButton>
      </form>
    </FormProvider>
  )
}

export default LocalLogin;
import React from 'react'
import { BasicCheckbox, FieldLabel, TextField } from '../../../../components/FormComponents'
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
          {t('login.forgot_password')}
        </LinkButton>

        {authenticationError && <ErrorMessage type={authenticationError} />}

        <br />

        <OutlinedButton type="submit">
          {t('form.submit')}
        </OutlinedButton>
      </form>
    </FormProvider>
  )
}

export default LocalLogin;
import React from 'react';
import { FieldLabel, PasswordField } from '../../../../components/FormComponents';
import { ContainedButton, ErrorMessage } from '../../../../components/UIComponents';

import { useChangePassword } from '../viewModel';

function ChangePassword({ t }) {
  const {
    FormProvider,
    methods,
    onSubmit,
    authenticationError
  } = useChangePassword();

  const { handleSubmit } = methods;

  return (
    <>
      <h6>{t('settings.change_password')}</h6>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>

          <FieldLabel>{t('settings.current_password')}</FieldLabel>
          <PasswordField name="currentPassword" />

          <FieldLabel>{t('settings.new_password')}</FieldLabel>
          <PasswordField name="newPassword" />

          <FieldLabel>{t('settings.repeat_new_password')}</FieldLabel>
          <PasswordField name="newPasswordRepeat" />

          {authenticationError && <ErrorMessage type={authenticationError} />}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ContainedButton type="submit">{t('form.submit')}</ContainedButton>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default ChangePassword
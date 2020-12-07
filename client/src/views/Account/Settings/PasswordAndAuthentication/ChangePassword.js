import React from 'react';
import { FieldLabel, PasswordField } from '../../../../components/FormComponents';
import { ContainedButton, ErrorMessage } from '../../../../components/UIComponents';

import { useChangePassword } from '../viewModel';

function ChangePassword({ t }) {
  const {
    FormProvider,
    methods,
    onSubmit,
    authActionError
  } = useChangePassword();

  const { handleSubmit } = methods;

  return (
    <>
      <h6>Change password</h6>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>

          <FieldLabel> {t('settings.current_password')}</FieldLabel>
          <PasswordField name="currentPassword" />

          <FieldLabel> {t('settings.new_password')}</FieldLabel>
          <PasswordField name="newPassword" />

          <FieldLabel> {t('settings.repeat_new_password')}</FieldLabel>
          <PasswordField name="newPasswordRepeat" />

          {authActionError && <ErrorMessage>Password reset unsuccessful. Please try again.</ErrorMessage>}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ContainedButton type="submit">Submit</ContainedButton>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default ChangePassword
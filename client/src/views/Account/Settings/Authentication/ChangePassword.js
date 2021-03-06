import React from 'react';
import { FieldLabel, PasswordField } from '../../../../components/FormComponents';
import {
  ContainedButton,
  ErrorAlert,
  PasswordCriteriaList,
  Spinner
} from '../../../../components/UIComponents';

import { useChangePassword } from '../viewModel';

function ChangePassword({ t, appError, isLoading }) {
  const {
    FormProvider,
    methods,
    onSubmit,
  } = useChangePassword();

  const { handleSubmit } = methods;

  return (
    <>
      <h5 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{t('settings.change_password')}</h5>

      <PasswordCriteriaList />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>

          <FieldLabel>{t('settings.current_password')}</FieldLabel>
          <PasswordField name="currentPassword" />

          <FieldLabel>{t('settings.new_password')}</FieldLabel>
          <PasswordField name="newPassword" />

          <FieldLabel>{t('settings.repeat_new_password')}</FieldLabel>
          <PasswordField name="newPasswordRepeat" />

          {appError && <ErrorAlert type={appError} />}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ContainedButton type="submit">
              {t('form.submit')}
              {isLoading && <Spinner />}
            </ContainedButton>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default ChangePassword
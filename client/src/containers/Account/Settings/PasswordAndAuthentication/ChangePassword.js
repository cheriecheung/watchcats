import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldLabel, PasswordField } from '../../../../components/FormComponents';
import { resetPassword } from '../../../../redux/actions/authenticationActions'
import { useDispatch, useSelector } from 'react-redux';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reset_password_schema } from '../../_validationSchema'
import { reset_password_default_values as defaultValues } from '../../_defaultValues'

const resolver = yupResolver(reset_password_schema)

function ChangePassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log({ data })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>

        <FieldLabel> {t('settings.current_password')}</FieldLabel>
        <PasswordField name="currentPassword" />

        <FieldLabel> {t('settings.new_password')}</FieldLabel>
        <PasswordField name="newPassword" />

        <FieldLabel> {t('settings.repeat_new_password')}</FieldLabel>
        <PasswordField name="newPasswordRepeat" />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" onClick={() => dispatch(resetPassword())}>Submit</button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ChangePassword
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  register_default_values as defaultValues,
  register_schema
} from '../../_formConfig'
import { FieldLabel, PasswordField, TextField } from '../../../../components/FormComponents'

const resolver = yupResolver(register_schema)

function Local({ t, onRegister }) {
  const methods = useForm({ defaultValues, resolver });
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

        <input type="submit" value={t('form.register')} />
      </form>
    </FormProvider>
  )
}

export default Local
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { register_schema } from '../../Account/_validationSchema'
import { FieldLabel, PasswordField, TextField } from '../../../components/FormComponents'

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

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
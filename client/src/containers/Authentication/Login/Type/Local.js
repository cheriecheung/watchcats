import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login_schema } from '../../../Account/_validationSchema'

import { FieldLabel, TextField } from '../../../../components/FormComponents'
import ThemeButton from '../../../../components/General/ThemeButton'

const defaultValues = {
  email: '',
  password: ''
}

const resolver = yupResolver(login_schema)

function LocalLogin({ onLogin, errorMessage }) {
  const { t, i18n } = useTranslation();

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, errors, watch } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onLogin)}
        style={{ textAlign: 'left', display: 'grid', gridGap: 1 }}
      >
        <FieldLabel>{t('form.email')}</FieldLabel>
        <TextField name="email" />

        <FieldLabel>{t('form.password')}</FieldLabel>
        <TextField name="password" type="password" />

        <Link
          to="/forgot_password"
          style={{ background: 'none', border: 'none', outline: 'none', float: 'right' }}
        >
          Forgot password?
        </Link>

        <ThemeButton type="submit">
          {t('login.login')}
        </ThemeButton>

        {errorMessage && (
          <span style={{ color: 'red' }}>{errorMessage}</span>
        )}
      </form>
    </FormProvider>
  )
}

export default LocalLogin;
import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  login_default_values as defaultValues,
  login_schema
} from '../../_formConfig'

import { FieldLabel, TextField } from '../../../../components/FormComponents'
import { ButtonFilled } from '../../../../components/UIComponents'

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

        <ButtonFilled type="submit">
          {t('login.login')}
        </ButtonFilled>

        {errorMessage && (
          <span style={{ color: 'red' }}>{errorMessage}</span>
        )}
      </form>
    </FormProvider>
  )
}

export default LocalLogin;
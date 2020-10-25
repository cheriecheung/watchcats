import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, login } from '../../redux/actions/userActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { login_schema } from '../Account/_validationSchema'

import { useForm, FormProvider } from 'react-hook-form';
import { FieldLabel, TextField } from '../../components/FormComponents'
import { Link } from 'react-router-dom';

const defaultValues = {
  email: '',
  password: ''
}

const resolver = yupResolver(login_schema)

function Login() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, errors, watch } = methods;

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <div style={{ width: '30vw', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t('login.login')}</h4>
        <Link
          to="/register"
          style={{ background: 'none', border: 'none', outline: 'none' }}
        >
          {t('register.register')}
        </Link>
      </div>

      <button type="button" className="form-control btn btn-info">
        Continue as DEMO USER
            </button>
      <button
        type="button"
        className="form-control btn btn-danger"
        onClick={handleGoogleLogin}
      >
        Google
            </button>

      <div className="hr-label">
        <span>{t('form.or')}</span>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleLogin)}
          style={{ textAlign: 'left', display: 'grid', gridGap: 15 }}
        >
          <FieldLabel>{t('form.email')}</FieldLabel>
          <TextField name="email" />

          <FieldLabel>{t('form.password')}</FieldLabel>
          <TextField name="password" />

          <Link
            to="/forgot_password"
            style={{ background: 'none', border: 'none', outline: 'none' }}
          >
            Forgot password?
        </Link>

          <input
            type="submit"
            value={t('login.login')}
            style={{ float: 'right' }}
          />
          {auth.errorMessage && (
            <span style={{ color: 'red' }}>{auth.errorMessage}</span>
          )}
        </form>
      </FormProvider>
    </div>
  )
}

export default Login 
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, login } from '../../redux/actions/userActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { login_schema } from '../Account/_validationSchema'

import { useForm, FormProvider } from 'react-hook-form';
import { FieldLabel, TextField } from '../../components/FormComponents'
import { Link } from 'react-router-dom';

import { SectionContainer } from '../../components/FormComponents'
import ThemeButton from '../../components/General/ThemeButton'

import PhoneLogin from './PhoneLogin'

const defaultValues = {
  email: '',
  password: ''
}

const resolver = yupResolver(login_schema)

function Login() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { errorMessage, loginByPhone } = useSelector((state) => state.authentication);

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, errors, watch } = methods;

  useEffect(() => {
    return () => {
      dispatch({ type: 'PHONE_LOGIN', payload: false });
    };
  }, [])

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loginByPhone ?
        <PhoneLogin />
        :
        <SectionContainer style={{ width: '50vw', marginTop: 30 }}>
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

            <button type="button" className="form-control btn btn-info mb-3">
              Continue as DEMO USER
      </button>
            <button
              type="button"
              className="form-control btn btn-danger mb-3"
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
                style={{ textAlign: 'left', display: 'grid', gridGap: 1 }}
              >
                <FieldLabel>{t('form.email')}</FieldLabel>
                <TextField name="email" />

                <FieldLabel>{t('form.password')}</FieldLabel>
                <TextField name="password" />

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
          </div>
        </SectionContainer>

      }
    </div>
  )
}

export default Login 
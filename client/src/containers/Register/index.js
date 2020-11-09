import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { registration } from '../../redux/actions/authenticationActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { register_schema } from '../Account/_validationSchema'
import { Link } from 'react-router-dom';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const resolver = yupResolver(register_schema)

function Register() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch()

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, errors, watch, register } = methods;

  const handleRegister = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(registration(firstName, lastName, email, password));
  };

  return (
    <div style={{ width: '30vw', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t('register.register')}</h4>
        <Link
          to="/login"
          style={{ background: 'none', border: 'none', outline: 'none' }}
        >
          {t('login.login')}
        </Link>
      </div>

      <button type="button" className="form-control btn btn-danger">
        Google
              </button>

      <div className="hr-label">
        <span>{t('form.or')}</span>
      </div>


      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleRegister)}
          style={{ textAlign: 'left', display: 'grid', gridGap: 15 }}
        >
          <div>
            <b>{t('form.first_name')}</b>
            <input
              className="form-control"
              name="firstName"
              type="text"
              ref={register({
                pattern: /^[A-Z]+$/i,
                validate: (value) => value !== '',
              })}
            />
            {errors.firstName && errors.firstName.type === 'pattern' && (
              <p style={{ color: 'red', margin: 0 }}>{t('form.only_alphabet')}</p>
            )}
            {errors.firstName && errors.firstName.type === 'validate' && (
              <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
            )}
          </div>

          <div>
            <b>{t('form.last_name')}</b>
            <input
              className="form-control"
              name="lastName"
              type="text"
              ref={register({
                pattern: /^[A-Z]+$/i,
                validate: (value) => value !== '',
              })}
            />
            {errors.lastName && errors.lastName.type === 'pattern' && (
              <p style={{ color: 'red', margin: 0 }}>{t('form.only_alphabet')}</p>
            )}
            {errors.lastName && errors.lastName.type === 'validate' && (
              <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
            )}
          </div>

          <div>
            <b>{t('form.email')}</b>
            <input
              className="form-control"
              name="email"
              type="email"
              ref={register({
                validate: (value) => value !== '',
              })}
            />
            {errors.email && (
              <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
            )}
          </div>

          <div>
            <b>{t('form.password')}</b>
            <input
              className="form-control"
              name="password"
              type="password"
              ref={register({
                validate: (value) => value !== '',
              })}
            />
            {errors.password && (
              <p style={{ color: 'red', margin: 0 }}>{t('form.no_empty')}</p>
            )}
          </div>
          <input
            type="submit"
            value={t('form.register')}
            style={{ float: 'right' }}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default Register;
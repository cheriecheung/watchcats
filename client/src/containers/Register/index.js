import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { registration } from '../../redux/actions/authenticationActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { register_schema } from '../Account/_validationSchema'
import { Link } from 'react-router-dom';
import { FieldLabel, PasswordField, TextField } from '../../components/FormComponents'

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
  const { handleSubmit } = methods;

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
    </div>
  )
}

export default Register;
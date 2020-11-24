import React from 'react';
import { HorizontalDivider, LinkButton } from '../../../components/UIComponents'

import Google from './containers/Google'
import Local from './containers/Local'

import { useRegister } from '../viewModel';

function Register() {
  const { t, onGoogleLogin, localRegisterProps } = useRegister()

  return (
    <div style={{ width: '30vw', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>{t('register.register')}</h4>
        <LinkButton to="/login">
          {t('login.login')}
        </LinkButton>
      </div>

      <Google onGoogleLogin={onGoogleLogin} />

      <HorizontalDivider>{t('form.or')}</HorizontalDivider>

      <Local t={t} localRegisterProps={localRegisterProps} />
    </div>
  )
}

export default Register;
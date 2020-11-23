import React from 'react';
import { HorizontalDivider, LinkButton } from '../../../components/UIComponents'

import { Google, Local } from './Type'
import { useRegister } from '../viewModel';

function Register() {
  const { t, onGoogleLogin, onRegister } = useRegister()

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

      <Local t={t} onRegister={onRegister} />
    </div>
  )
}

export default Register;
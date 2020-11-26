import React from 'react';
import { HorizontalDivider, LinkButton, VerticalCard } from '../../../components/UIComponents'

import Google from './containers/Google'
import Local from './containers/Local'

import { useRegister } from '../viewModel';

function Register() {
  const { t, onGoogleLogin, localRegisterProps } = useRegister()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>

      <VerticalCard variant="authentication">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>{t('register.register')}</h4>
          <LinkButton to="/login">
            {t('login.login')}
          </LinkButton>
        </div>

        <Google onGoogleLogin={onGoogleLogin} />

        <HorizontalDivider>{t('form.or')}</HorizontalDivider>

        <Local t={t} localRegisterProps={localRegisterProps} />
      </VerticalCard>
    </div>
  )
}

export default Register;
import React from 'react';
import { HorizontalDivider, LinkButton, VerticalCard } from '../../../components/UIComponents'

import Google from './containers/Google'
import Local from './containers/Local'

import { useAuthentication, useRegister } from '../viewModel';

function Register() {
  const { t, appError } = useAuthentication();
  const { onGoogleLogin, localRegisterProps } = useRegister()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>

      <VerticalCard variant="authentication">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>{t('register.title')}</h4>
          <LinkButton to="/login">
            {t('login.title')}
          </LinkButton>
        </div>

        <Google onGoogleLogin={onGoogleLogin} />

        <HorizontalDivider>{t('form.or')}</HorizontalDivider>

        <Local
          t={t}
          localRegisterProps={localRegisterProps}
          appError={appError}
        />
      </VerticalCard>
    </div>
  )
}

export default Register;
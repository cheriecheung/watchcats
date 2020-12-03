import React from 'react'
import { HorizontalDivider, LinkButton, VerticalCard } from '../../../components/UIComponents'

import DemoUser from './containers/DemoUser'
import Google from './containers/Google'
import Local from './containers/Local'
import Phone from './containers/Phone'

import { useLogin } from '../viewModel'

function Login() {
  const {
    t,
    localLoginProps,
    phoneLoginProps,
    onGoogleLogin,
    loginByPhone,
  } = useLogin();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
      {loginByPhone ?
        <VerticalCard
          variant="authentication"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Phone t={t} phoneLoginProps={phoneLoginProps} />
        </VerticalCard>
        :
        <VerticalCard variant="authentication">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>{t('login.login')}</h4>
            <LinkButton to="/register">
              {t('register.register')}
            </LinkButton>
          </div>

          <DemoUser t={t} />
          <Google t={t} onGoogleLogin={onGoogleLogin} />

          <HorizontalDivider>{t('form.or')}</HorizontalDivider>

          <Local t={t} localLoginProps={localLoginProps} />
        </VerticalCard>
      }
    </div>
  )
}

export default Login 
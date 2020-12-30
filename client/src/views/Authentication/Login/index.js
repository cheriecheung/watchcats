import React from 'react'
import { HorizontalDivider, LinkButton, VerticalCard } from '../../../components/UIComponents'

import DemoUser from './containers/DemoUser'
import Google from './containers/Google'
import Local from './containers/Local'
import Phone from './containers/Phone'

import { useAuthentication, useLogin } from '../viewModel'

function Login() {
  const {
    t,
    authError,
    isLoadingGoogleLogin,
    isLoadingLocalLogin,
    isLoadingPhoneLogin
  } = useAuthentication();

  const {
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
          <Phone
            phoneLoginProps={phoneLoginProps}
            authError={authError}
            isLoadingPhoneLogin={isLoadingPhoneLogin}
          />
        </VerticalCard>
        :
        <VerticalCard variant="authentication">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>{t('login.title')}</h4>
            <LinkButton to="/register">
              {t('register.title')}
            </LinkButton>
          </div>

          <DemoUser t={t} />
          <Google
            onGoogleLogin={onGoogleLogin}
            isLoading={isLoadingGoogleLogin}
          />

          <HorizontalDivider>{t('form.or')}</HorizontalDivider>

          <Local
            t={t}
            authError={authError}
            localLoginProps={localLoginProps}
            isLoading={isLoadingLocalLogin}
          />
        </VerticalCard>
      }
    </div>
  )
}

export default Login 
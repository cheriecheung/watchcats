import React from 'react'
import { useTranslation } from 'react-i18next';
import { HorizontalCard, HorizontalDivider, LinkButton } from '../../../components/UIComponents'
import { useLogin } from '../viewModel'

import { DemoUser, Google, Local, Phone } from './Type'

function Login() {
  const { t, i18n } = useTranslation();

  const {
    onLogin,
    onGoogleLogin,
    errorMessage,
    loginByPhone,
    onPhoneLogin
  } = useLogin();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
      {loginByPhone ?
        <Phone onPhoneLogin={onPhoneLogin} />
        :
        <HorizontalCard>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>{t('login.login')}</h4>
            <LinkButton to="/register">
              {t('register.register')}
            </LinkButton>
          </div>

          <DemoUser />
          <Google onGoogleLogin={onGoogleLogin} />

          <HorizontalDivider>{t('form.or')}</HorizontalDivider>

          <Local onLogin={onLogin} errorMessage={errorMessage} />
        </HorizontalCard>
      }
    </div>
  )
}

export default Login 
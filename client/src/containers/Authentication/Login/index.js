import React from 'react'
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { SectionContainer } from '../../../components/FormComponents'
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {loginByPhone ?
        <Phone onPhoneLogin={onPhoneLogin} />
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

            <DemoUser />
            <Google onGoogleLogin={onGoogleLogin} />

            <div className="hr-label">
              <span>{t('form.or')}</span>
            </div>

            <Local onLogin={onLogin} errorMessage={errorMessage} />
          </div>
        </SectionContainer>
      }
    </div>
  )
}

export default Login 
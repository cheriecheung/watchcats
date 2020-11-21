import React from 'react';
import { Link } from 'react-router-dom';

import { Google, Local } from './Type'
import { useRegister } from '../viewModel';

function Register() {
  const { t, onGoogleLogin, onRegister } = useRegister()

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

      <Google onGoogleLogin={onGoogleLogin} />

      <div className="hr-label">
        <span>{t('form.or')}</span>
      </div>

      <Local t={t} onRegister={onRegister} />
    </div>
  )
}

export default Register;
import React from 'react'
import google_logo from '../../assets/images/google_logo.png'
import { OutlinedButton } from '../UIComponents'

function GoogleLoginButton({ t, onClick }) {
  return (
    <OutlinedButton
      type="button"
      style={{ width: '100%', marginTop: 10 }}
      onClick={onClick}
    >
      <img
        src={google_logo}
        style={{ width: 'auto', height: '70%', marginLeft: '-10px', marginRight: 10 }}
      />
      {t('login.google_login')}
    </OutlinedButton>
  )
}

export default GoogleLoginButton
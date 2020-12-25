import React from 'react'
import { GoogleLoginButton } from '../../../../components/Google'

function Google({ t, onGoogleLogin }) {
  return <GoogleLoginButton t={t} onClick={onGoogleLogin} />
}

export default Google
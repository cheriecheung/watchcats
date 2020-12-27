import React from 'react'
import { GoogleLoginButton } from '../../../../components/Google'

function Google({ t, onGoogleLogin, isLoading }) {
  return <GoogleLoginButton t={t} onClick={onGoogleLogin} isLoading={isLoading} />
}

export default Google
import React from 'react'
import { GoogleLoginButton } from '../../../../components/Google'

function Google({ onGoogleLogin, isLoading }) {
  return <GoogleLoginButton onClick={onGoogleLogin} isLoading={isLoading} />
}

export default Google
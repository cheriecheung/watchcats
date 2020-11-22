import React from 'react'
import { OutlinedButton } from '../../../../components/UIComponents'

function Google({ onGoogleLogin }) {
  return (
    <OutlinedButton
      type="button"
      style={{ width: '100%', marginTop: 10 }}
      onClick={onGoogleLogin}
    >
      Google
    </OutlinedButton>
  )
}

export default Google
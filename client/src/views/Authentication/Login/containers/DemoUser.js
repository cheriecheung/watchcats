import React from 'react'
import { ContainedButton, Spinner } from '../../../../components/UIComponents'

function DemoUserLogin({ t, isLoading, onLoginAsDemoUser }) {
  return (
    <ContainedButton
      type="button"
      style={{ width: '100%' }}
      onClick={onLoginAsDemoUser}
    >
      {t('login.demo_user')}
      {isLoading && <Spinner />}
    </ContainedButton>
  )
}

export default DemoUserLogin
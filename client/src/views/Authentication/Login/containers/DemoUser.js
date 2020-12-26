import React from 'react'
import { ContainedButton } from '../../../../components/UIComponents'

function DemoUserLogin({ t }) {
  return (
    <ContainedButton type="button" style={{ width: '100%' }}>
      {t('login.demo_user')}
    </ContainedButton>
  )
}

export default DemoUserLogin
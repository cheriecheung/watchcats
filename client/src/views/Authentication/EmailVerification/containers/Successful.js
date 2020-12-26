import React from 'react';
import { LinkButton } from '../../../../components/UIComponents'

function Successful({ t }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span>
        {t('email_verification.success')}
        <LinkButton>{t('login.log_in')}</LinkButton>
      </span>
      {/* <span>Activation successful. You are now able to <LinkButton to="/login">log in</LinkButton>.</span> */}
    </div>
  )
}

export default Successful
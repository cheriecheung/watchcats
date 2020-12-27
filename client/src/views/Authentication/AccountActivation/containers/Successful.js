import React from 'react';
import { LinkButton } from '../../../../components/UIComponents'
import { themeColor } from '../../../../style/theme'

function Successful({ t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <i className="far fa-check-circle fa-3x" style={{ color: themeColor.green }} />
      <br />

      <span>{t('account_activation.success1')}</span>
      <span>
        {t('account_activation.success2')}
        <LinkButton to="/login" variant="colored" t>
          {t('login.log_in')}
        </LinkButton>
      </span>
    </div>
  )
}

export default Successful
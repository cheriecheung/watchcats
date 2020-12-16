import React from 'react'
import { FieldLabel } from '../../../../components/FormComponents';
import { Alert, ErrorMessage, TextButton } from '../../../../components/UIComponents'
import { Switch } from 'antd';

function EmailDisplay({
  emailProps,
  onChangeNotification,
  prevSettings,
  accountError
}) {
  const {
    email,
    revealEmail,
    setRevealEmail,
    asteriskedEmail,
    getEmailNotification
  } = emailProps

  return (
    <>
      <FieldLabel>Email</FieldLabel>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {revealEmail ? <span>{email}</span> : <span>{asteriskedEmail}</span>}

        <div style={{ display: 'flex' }}>
          {revealEmail ?
            <TextButton onClick={() => setRevealEmail(false)}>Hide</TextButton>
            :
            <TextButton onClick={() => setRevealEmail(true)}>Reveal</TextButton>
          }
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span>Receive notifications</span>
        <Switch
          defaultChecked={getEmailNotification}
          checked={getEmailNotification}
          onChange={(checked) => onChangeNotification('email')}
        />
      </div>

      {accountError &&
        accountError === 'ERROR/SET_EMAIL_NOTIFICATION_FAILED' &&
        <ErrorMessage type={accountError} />
      }

      {prevSettings &&
        prevSettings.getEmailNotification !== getEmailNotification &&
        <Alert type="success" closable={true} style={{ marginTop: 10 }}>
          Notification setting updated
       </Alert>
      }
    </>
  )
}

export default EmailDisplay
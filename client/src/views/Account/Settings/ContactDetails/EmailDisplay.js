import React from 'react'
import { FieldLabel } from '../../../../components/FormComponents';
import { ErrorAlert, SuccessAlert, TextButton } from '../../../../components/UIComponents'
import { Switch } from 'antd';

function EmailDisplay({
  t,
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
      <FieldLabel>{t('settings.email')}</FieldLabel>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {revealEmail ?
          <span>{email}</span> :
          <span>{asteriskedEmail}</span>
        }

        <div style={{ display: 'flex' }}>
          {revealEmail ?
            <TextButton onClick={() => setRevealEmail(false)}>
              {t('settings.hide')}
            </TextButton>
            :
            <TextButton onClick={() => setRevealEmail(true)}>
              {t('settings.reveal')}
            </TextButton>
          }
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span>{t('settings.receive_notifications')}</span>
        <Switch
          defaultChecked={getEmailNotification}
          checked={getEmailNotification}
          onChange={(checked) => onChangeNotification('email')}
        />
      </div>

      {accountError &&
        accountError === 'ERROR/SET_EMAIL_NOTIFICATION_FAILED' &&
        <ErrorAlert type={accountError} />
      }

      {prevSettings &&
        prevSettings.getEmailNotification !== getEmailNotification &&
        <SuccessAlert closable={true} style={{ marginTop: 10 }}>
          {t('success.notification_setting')}
        </SuccessAlert>
      }
    </>
  )
}

export default EmailDisplay
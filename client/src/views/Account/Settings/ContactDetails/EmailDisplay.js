import React from 'react'
import { FieldLabel } from '../../../../components/FormComponents';
import { ErrorAlert, SuccessAlert, TextButton } from '../../../../components/UIComponents'
import { Switch } from 'antd';

function EmailDisplay({
  t,
  emailProps,
  onChangeNotification,
  prevSettings,
  accountError,
  hasSetEmailNotificationError
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
            <TextButton
              onClick={() => setRevealEmail(false)}
              colored={true}
            >
              {t('settings.hide')}
            </TextButton>
            :
            <TextButton
              onClick={() => setRevealEmail(true)}
              colored={true}
            >
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
        hasSetEmailNotificationError &&
        <ErrorAlert type={accountError} />
      }

      {prevSettings &&
        prevSettings.getEmailNotification !== getEmailNotification &&
        <SuccessAlert
          message={t('success.notification_setting')}
          closable={true}
          style={{ marginTop: 10 }}
        />
      }
    </>
  )
}

export default EmailDisplay
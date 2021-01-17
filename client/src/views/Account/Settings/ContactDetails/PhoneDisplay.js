import React from 'react'
import { FieldLabel } from '../../../../components/FormComponents';
import { ErrorAlert, OutlinedButton, SuccessAlert, TextButton } from '../../../../components/UIComponents'
import { Switch } from 'antd';

function PhoneDisplay({
  t,
  phoneProps,
  addPhone,
  editPhone,
  removePhone,
  onChangeNotification,
  prevSettings,
  accountError,
  hasSetPhoneNotificationError
}) {
  const {
    phone,
    revealPhone,
    setRevealPhone,
    asteriskedPhone,
    getSmsNotification,
  } = phoneProps

  return (
    <>
      <FieldLabel>{t('settings.phone')}</FieldLabel>

      {phone ?
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {revealPhone ?
            <span>{phone}</span> :
            <span>{asteriskedPhone}</span>
          }

          <div style={{ display: 'flex' }}>
            {revealPhone ?
              <TextButton
                onClick={() => setRevealPhone(false)}
                colored={true}
              >
                {t('settings.hide')}
              </TextButton>
              :
              <TextButton
                onClick={() => setRevealPhone(true)}
                colored={true}
              >
                {t('settings.reveal')}
              </TextButton>
            }

            <TextButton
              style={{ float: 'right' }}
              onClick={removePhone}
            >
              {t('settings.remove')}
            </TextButton>
            <OutlinedButton
              style={{ float: 'right', height: 25, padding: '0 10px' }}
              onClick={editPhone}>
              {t('settings.edit')}
            </OutlinedButton>
          </div>
        </div>
        :
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>&#8212;</span>
          <TextButton
            onClick={addPhone}
            colored={true}
          >
            {t('settings.add')}
          </TextButton>
        </div>
      }

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span>{t('settings.receive_notifications')}</span>
        <Switch
          defaultChecked={getSmsNotification}
          checked={getSmsNotification}
          disabled={!phone}
          onChange={() => onChangeNotification('sms')}
        />
      </div>

      {accountError &&
        hasSetPhoneNotificationError &&
        <ErrorAlert type={accountError} />
      }

      {prevSettings &&
        prevSettings.getSmsNotification !== getSmsNotification &&
        <SuccessAlert
          message={t('success.notification_setting')}
          closable={true}
          style={{ marginTop: 10 }}
        />
      }
    </>
  )
}

export default PhoneDisplay
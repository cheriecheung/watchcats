import React from 'react'
import { FieldLabel } from '../../../../components/FormComponents';
import { Alert, ErrorMessage, TextButton } from '../../../../components/UIComponents'
import { Switch } from 'antd';

function PhoneDisplay({
  phoneProps,
  addPhone,
  editPhone,
  removePhone,
  onChangeNotification,
  prevSettings,
  accountError
}) {
  const {
    phone,
    revealPhone,
    setRevealPhone,
    asteriskedPhone,
    getSmsNotification,
    // deletePhone
  } = phoneProps

  return (
    <>
      <FieldLabel>Phone number</FieldLabel>

      {phone ?
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {revealPhone ? <span>{phone}</span> : <span>{asteriskedPhone}</span>}

          <div style={{ display: 'flex' }}>
            {revealPhone ?
              <TextButton onClick={() => setRevealPhone(false)}>Hide</TextButton>
              :
              <TextButton onClick={() => setRevealPhone(true)}>Reveal</TextButton>
            }
            <TextButton
              style={{ float: 'right' }}
              onClick={removePhone}
            >
              Remove
              </TextButton>
            <TextButton
              style={{ float: 'right' }}
              onClick={editPhone}>
              Edit
              </TextButton>
          </div>
        </div>
        :
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>&#8212;</span>
          <TextButton
            onClick={addPhone}
          >
            Add
            </TextButton>
        </div>
      }

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span>Receive notifications</span>
        <Switch
          defaultChecked={getSmsNotification}
          checked={getSmsNotification}
          disabled={!phone}
          onChange={() => onChangeNotification('sms')}
        />
      </div>

      {accountError &&
        accountError === 'ERROR/SET_PHONE_NOTIFICATION_FAILED' &&
        <ErrorMessage type={accountError} />
      }

      {prevSettings &&
        prevSettings.getSmsNotification !== getSmsNotification &&
        <Alert type="success" closable={true} style={{ marginTop: 10 }}>
          Notification setting updated
          </Alert>
      }
    </>
  )
}

export default PhoneDisplay
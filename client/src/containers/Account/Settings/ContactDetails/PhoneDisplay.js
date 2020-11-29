import React from 'react'
import { FieldLabel } from '../../../../components/FormComponents';
import { Alert, TextButton } from '../../../../components/UIComponents'
import { Switch } from 'antd';

function PhoneDisplay({
  phoneProps,
  onChangeNotification,
  prevSettings,
  addPhone,
  editPhone,
  removePhone
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          onChange={(checked) => onChangeNotification('sms')}
        />
      </div>

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
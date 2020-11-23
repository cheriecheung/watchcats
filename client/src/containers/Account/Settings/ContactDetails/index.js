import React, { useState } from 'react';
import { FieldLabel } from '../../../../components/FormComponents';
import { ContainedButton, Modal, TextButton, VerticalDivider, WrapLayout } from '../../../../components/UIComponents';
import { Switch } from 'antd';

import { useDispatch } from 'react-redux';

import PhoneNumberInput from './PhoneNumberInput'
import PhoneNumberVerification from './PhoneNumberVerification'

function ContactDetails({
  contactDetailsProps,
  phoneNumberInputProps,
  phoneVerificationProps
}) {
  const dispatch = useDispatch();

  const {
    email,
    asteriskedEmail,
    phone,
    asteriskedPhone,
    revealEmail,
    setRevealEmail,
    revealPhone,
    setRevealPhone,
    deletePhone
  } = contactDetailsProps

  const { changePhoneNumberStep } = phoneNumberInputProps;

  const [showModal, setShowModal] = useState(false);

  const renderModalContent = () => {
    switch (changePhoneNumberStep) {
      case 'submitted':
        return (
          <PhoneNumberVerification
            phoneVerificationProps={phoneVerificationProps}
            closeModal={() => setShowModal(false)}
          />
        )
      case 'input':
        return (
          <PhoneNumberInput phoneNumberInputProps={phoneNumberInputProps} />
        )
      case 'verified':
        return (
          <>
            <i className="far fa-check-circle fa-3x" />
            <br />
            <br />
            <p>You have successfully verified your phone</p>
            <ContainedButton onClick={() => setShowModal(false)}>OK</ContainedButton>
          </>
        )
    }
  }

  return (
    <WrapLayout>
      <Modal
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {renderModalContent()}
      </Modal>

      <div style={{ flexBasis: '45%' }}>
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
          <Switch defaultChecked={false} onChange={(checked) => console.log({ checked })} />
        </div>
      </div>

      <VerticalDivider />

      <div style={{ flexBasis: '45%' }}>
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
                onClick={deletePhone}
              >
                Remove
              </TextButton>
              <TextButton
                style={{ float: 'right' }}
                onClick={() => {
                  dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
                  setShowModal(true)
                }}>
                Edit
              </TextButton>
            </div>
          </div>
          :
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TextButton
              onClick={() => {
                dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
                setShowModal(true)
              }}
            >
              Add
            </TextButton>
          </div>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span>Receive notifications</span>
          <Switch defaultChecked={true} disabled={!phone} onChange={(checked) => console.log({ checked })} />
        </div>
      </div>
    </WrapLayout>
  )
}

export default ContactDetails;
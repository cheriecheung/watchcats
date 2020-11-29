import React, { useState } from 'react';
import { Modal, VerticalDivider, WrapLayout } from '../../../../components/UIComponents';

import { useDispatch } from 'react-redux';

import EmailDisplay from './EmailDisplay'
import PhoneDisplay from './PhoneDisplay'

import PhoneNumberInput from './PhoneNumberInput'
import PhoneNumberVerification from './PhoneNumberVerification'
import PhoneNumberVerified from './PhoneNumberVerified';

function ContactDetails({ contactDetailsProps }) {
  const {
    t,
    onChangeNotification,
    prevSettings,
    emailProps,
    phoneProps,
    phoneNumberInputProps,
  } = contactDetailsProps;

  const { getOtp } = phoneProps;
  const { changePhoneNumberStep } = phoneNumberInputProps;

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const renderModalContent = () => {
    switch (changePhoneNumberStep) {
      case 'verifyToSave':
      case 'verifyToRemove':
        return <PhoneNumberVerification t={t} />
      case 'input':
        return <PhoneNumberInput t={t} phoneNumberInputProps={phoneNumberInputProps} />
      case 'verified':
        return <PhoneNumberVerified t={t} closeModal={() => setShowModal(false)} />
      default:
        break
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
        <EmailDisplay
          emailProps={emailProps}
          onChangeNotification={onChangeNotification}
          prevSettings={prevSettings}
        />
      </div>

      <VerticalDivider />

      <div style={{ flexBasis: '45%' }}>
        <PhoneDisplay
          phoneProps={phoneProps}
          onChangeNotification={onChangeNotification}
          prevSettings={prevSettings}

          // rename
          addPhone={() => {
            dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
            setShowModal(true)
          }}

          // rename
          editPhone={() => {
            dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
            setShowModal(true)
          }}

          // turns displayed phone number to previous one when clicked 
          removePhone={() => {
            getOtp()
            dispatch({ type: 'VERIFY_PHONE_NUMBER', payload: 'verifyToRemove' });
            setShowModal(true)
          }}
        />
      </div>
    </WrapLayout>
  )
}

export default ContactDetails;
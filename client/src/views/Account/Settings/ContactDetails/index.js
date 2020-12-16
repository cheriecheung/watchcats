import React from 'react';
import { Modal, SuccessDisplay, VerticalDivider, WrapLayout } from '../../../../components/UIComponents';
import EmailDisplay from './EmailDisplay'
import PhoneDisplay from './PhoneDisplay'
import PhoneNumberInput from './PhoneNumberInput'
import PhoneNumberVerification from './PhoneNumberVerification'

function ContactDetails({ contactDetailsProps }) {
  const {
    t,
    showModal,
    closeModal,
    onHandlePhoneNumber,
    onChangeNotification,
    prevSettings,
    emailProps,
    phoneProps,
    phoneNumberInputProps,
    accountError
  } = contactDetailsProps

  const { changePhoneNumberStep, inputPhoneNumber } = phoneNumberInputProps;

  const renderModalContent = () => {
    switch (changePhoneNumberStep) {
      case 'verifyToSave':
      case 'verifyToRemove':
        return (
          <PhoneNumberVerification
            t={t}
            accountError={accountError}
            inputPhoneNumber={inputPhoneNumber}
          />
        )
      case 'input':
        return (
          <PhoneNumberInput
            t={t}
            phoneNumberInputProps={phoneNumberInputProps}
            accountError={accountError}
          />
        )
      case 'verified':
        return (
          <SuccessDisplay
            message="You have successfully verified your phone"
            onClick={closeModal}
          />
        )
      case 'removed':
        return (
          <SuccessDisplay
            message="You have successfully removed your phone"
            onClick={closeModal}
          />
        )
      default:
        break
    }
  }

  return (
    <WrapLayout>
      <Modal
        centered
        visible={showModal}
        onCancel={closeModal}
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
          addPhone={() => onHandlePhoneNumber('add')}
          editPhone={() => onHandlePhoneNumber('edit')}
          removePhone={() => onHandlePhoneNumber('remove')}
        />
      </div>
    </WrapLayout>
  )
}

export default ContactDetails;
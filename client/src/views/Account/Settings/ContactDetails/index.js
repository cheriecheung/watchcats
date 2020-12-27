import React from 'react';
import { Modal, SuccessDisplay, ResponsiveDivider, WrapLayout } from '../../../../components/UIComponents';
import EmailDisplay from './EmailDisplay'
import PhoneDisplay from './PhoneDisplay'
import PhoneNumberInput from './PhoneNumberInput'
import PhoneNumberVerification from './PhoneNumberVerification'

function ContactDetails({
  t,
  accountError,
  contactDetailsProps,
  isLoadingSendSmsOtp,
  isLoadingSubmitPhoneNumber,
  isLoadingVerifyPhoneNumber
}) {
  const {
    showModal,
    closeModal,
    onHandlePhoneNumber,
    onChangeNotification,
    prevSettings,
    emailProps,
    phoneProps,
    phoneNumberInputProps,
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
            isLoadingSendSmsOtp={isLoadingSendSmsOtp}
            isLoadingVerifyPhoneNumber={isLoadingVerifyPhoneNumber}
          />
        )
      case 'input':
        return (
          <PhoneNumberInput
            t={t}
            accountError={accountError}
            isLoading={isLoadingSubmitPhoneNumber}
            phoneNumberInputProps={phoneNumberInputProps}
          />
        )
      case 'verified':
        return (
          <SuccessDisplay
            message={t('success.phone_verified')}
            onClick={closeModal}
          />
        )
      case 'removed':
        return (
          <SuccessDisplay
            message={t('success.phone_removed')}
            onClick={closeModal}
          />
        )
      default:
        break
    }
  }

  return (
    <>
      <Modal
        centered
        visible={showModal}
        onCancel={closeModal}
        footer={null}
      >
        {renderModalContent()}
      </Modal>

      <WrapLayout variant="contact">
        <div style={{ flexBasis: '48%' }}>
          <EmailDisplay
            t={t}
            emailProps={emailProps}
            onChangeNotification={onChangeNotification}
            prevSettings={prevSettings}
            accountError={accountError}
          />
        </div>

        <ResponsiveDivider />

        <div style={{ flexBasis: '48%' }}>
          <PhoneDisplay
            t={t}
            phoneProps={phoneProps}
            onChangeNotification={onChangeNotification}
            prevSettings={prevSettings}
            addPhone={() => onHandlePhoneNumber('add')}
            editPhone={() => onHandlePhoneNumber('edit')}
            removePhone={() => onHandlePhoneNumber('remove')}
            accountError={accountError}
          />
        </div>
      </WrapLayout>
    </>
  )
}

export default ContactDetails;
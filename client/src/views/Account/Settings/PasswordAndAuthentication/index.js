import React from 'react';
import { ContainedButton, Modal, OutlinedButton, SuccessDisplay } from '../../../../components/UIComponents'

import ChangePassword from './ChangePassword'
import Enable2FA from './Enable2FA'
import Disable2FA from './Disable2FA'

function PasswordAndAuthentication({ passwordAndAuthenticationProps }) {
  const {
    t,
    isTwoFactorEnabled,
    authActionStatus,
    showChangePasswordModal,
    showEnable2faModal,
    showDisable2faModal,
    showModal,
    closeModal,
    content
  } = passwordAndAuthenticationProps

  console.log({ isTwoFactorEnabled, authActionStatus })

  const renderModalContent = () => {
    switch (content) {
      case 'resetPassword':
        return <ChangePassword t={t} closeModal={closeModal} />
      case 'resetPasswordSuccess':
        return <SuccessDisplay message="You have successfully reset your password." onClick={closeModal} />
      case 'enable2FA':
        return <Enable2FA t={t} closeModal={closeModal} />
      case 'enable2FASuccess':
        return <SuccessDisplay message="You have enabled 2-factor authentication. You will now need to login by phone on top of logging in by email and password." onClick={closeModal} />
      case 'disable2FA':
        return <Disable2FA t={t} closeModal={closeModal} />
      case 'disable2FASuccess':
        return <SuccessDisplay message="You have disabled 2-factor authentication. You will now only log in by email and password." onClick={closeModal} />
      default:
        break;
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

      {/* disable if registered / signed in by google */}
      <ContainedButton
        type="button"
        onClick={showChangePasswordModal}
      >
        {t('settings.change_password')}
      </ContainedButton>

      <h6 style={{ marginTop: 40 }}>Two-Factor Authentication</h6>
            (Only for accounts registered by email and password)

      {
        isTwoFactorEnabled || authActionStatus === '2faEnabled' ?
          <>
            <h6>you have already enabled two factor auth</h6>
            <OutlinedButton onClick={showDisable2faModal}>Disable 2FA</OutlinedButton>
          </>
          :
          <>
            <p>
              Protect your account with an extra layer of security. Once configured, you'll be required
              to enter both your password and an authentication code from your mobile phone in order to
              sign in
          </p>

            {/* disable button if register via google */}
            <ContainedButton
              type="button"
              onClick={showEnable2faModal}
            >
              Enable Two-Factor Auth
          </ContainedButton>
          </>
      }
    </>
  )
}

export default PasswordAndAuthentication
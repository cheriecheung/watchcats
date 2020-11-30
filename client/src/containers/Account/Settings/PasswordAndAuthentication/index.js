import React from 'react';
import { ContainedButton, Modal, OutlinedButton } from '../../../../components/UIComponents'

import ChangePassword from './ChangePassword'
import Enable2FA, { EnableSuccess } from './Enable2FA'
import Disable2FA from './Disable2FA'

function PasswordAndAuthentication({ passwordAndAuthenticationProps }) {
  const {
    t,
    isTwoFactorEnabled,
    isActivated,
    showChangePasswordModal,
    showEnable2faModal,
    showDisable2faModal,
    showModal,
    closeModal,
    content
  } = passwordAndAuthenticationProps

  const renderModalContent = () => {
    switch (content) {
      case 'changePassword':
        return <ChangePassword t={t} closeModal={closeModal} />
      case 'enable2FA':
        return <Enable2FA t={t} closeModal={closeModal} />
      case 'enableSuccess':
        return <EnableSuccess t={t} closeModal={closeModal} />
      case 'disable2FA':
        return <Disable2FA t={t} closeModal={closeModal} />
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
        isTwoFactorEnabled || isActivated ?
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
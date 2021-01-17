import React from 'react';
import { FieldLabel } from '../../../../components/FormComponents'
import {
  ContainedButton,
  Modal,
  ModalSuccessDisplay,
  OutlinedButton,
  Remark,
  WrapLayout
} from '../../../../components/UIComponents'
import ChangePassword from './ChangePassword'
import Enable2FA from './Enable2FA'
import Disable2FA from './Disable2FA'

function Authentication({
  t,
  appError,
  authenticationProps,
  isLoadingChangePassword,
  isLoadingDisable2fa,
  isLoadingEnable2fa
}) {
  const {
    isDemoUser,
    isTwoFactorEnabled,
    isGoogleLogin,
    appActionStatus,
    showChangePasswordModal,
    showEnable2faModal,
    showDisable2faModal,
    showModal,
    closeModal,
    content
  } = authenticationProps

  console.log({ isGoogleLogin, isTwoFactorEnabled, appActionStatus })

  const renderModalContent = () => {
    switch (content) {
      case 'resetPassword':
        return (
          <ChangePassword
            t={t}
            appError={appError}
            isLoading={isLoadingChangePassword}
          />
        )
      case 'resetPasswordSuccess':
        return (
          <ModalSuccessDisplay
            message={t('success.password_reset')}
            onClick={closeModal}
          />
        )
      case 'enable2FA':
        return (
          <Enable2FA
            t={t}
            appError={appError}
            isLoading={isLoadingEnable2fa}
          />
        )
      case 'enable2FASuccess':
        return (
          <ModalSuccessDisplay
            message={t('success.2FA_enabled')}
            onClick={closeModal}
          />
        )
      case 'disable2FA':
        return (
          <Disable2FA
            appError={appError}
            isLoading={isLoadingDisable2fa}
          />
        )
      case 'disable2FASuccess':
        return (
          <ModalSuccessDisplay
            message={t('success.2FA_disabled')}
            onClick={closeModal}
          />
        )
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

      <FieldLabel>{t('settings.password')}</FieldLabel>
      <WrapLayout variant="settings">
        <p>{t('settings.password_description')}</p>
        <ContainedButton
          type="button"
          onClick={showChangePasswordModal}
          disabled={isGoogleLogin}
        >
          {t('settings.change_password')}
        </ContainedButton>
      </WrapLayout>

      <br />

      <FieldLabel>{t('settings.two_factor_auth')}</FieldLabel>
      <WrapLayout variant="settings">
        {
          isTwoFactorEnabled ?
            <>
              <p>{t('settings.2FA_enabled')}</p>
              <OutlinedButton onClick={showDisable2faModal}>
                {t('settings.disable_2FA')}
              </OutlinedButton>
            </>
            :
            <>

              <p>
                <Remark style={{ display: isDemoUser ? 'block' : 'none', textDecoration: 'underline' }}>
                  <i className="fas fa-exclamation fas-xs mr-1" />
                  {t('settings.two_factor_auth_as_demo_user')}
                </Remark>
                {t('settings.2FA_description')}
              </p>

              <ContainedButton
                type="button"
                onClick={showEnable2faModal}
                disabled={isGoogleLogin}
              >
                {t('settings.enable_2FA')}
              </ContainedButton>
            </>
        }
      </WrapLayout>
    </>
  )
}

export default Authentication
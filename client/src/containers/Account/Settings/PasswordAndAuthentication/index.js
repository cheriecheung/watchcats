import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGoogleAuthenticatorQrCode } from '../../../../redux/actions/authenticationActions'
import { ContainedButton, OutlinedButton } from '../../../../components/UIComponents'
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';
import { Modal } from 'antd';

import ChangePassword from './ChangePassword'
import Enable2FA, { EnableSuccess } from './Enable2FA'
import Disable2FA from './Disable2FA'

function PasswordAndAuthentication({ contactDetails, isActivated }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('')

  useEffect(() => {
    if (isActivated) {
      setContent('enableSuccess')
    }
  }, [isActivated])

  const onEnable2FA = () => {
    setShowModal(true)
    dispatch(getGoogleAuthenticatorQrCode())
    setContent('enable2FA')
  }

  const onDisable2FA = () => {
    setShowModal(true)
    setContent('disable2FA')
  }

  const renderModalContent = () => {
    switch (content) {
      case 'changePassword':
        return <ChangePassword closeModal={() => setShowModal(false)} />
      case 'enable2FA':
        return <Enable2FA closeModal={() => setShowModal(false)} />
      case 'enableSuccess':
        return <EnableSuccess closeModal={() => setShowModal(false)} />
      case 'disable2FA':
        return <Disable2FA closeModal={() => setShowModal(false)} />
      default:
        break;
    }
  }

  return (
    <>
      <Modal
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {renderModalContent()}
      </Modal>

      {/* disable if registered / signed in by google */}
      <ContainedButton
        type="button"
        onClick={() => {
          setShowModal(true)
          setContent('changePassword')
        }}
      >
        {t('settings.change_password')}
      </ContainedButton>

      <h6 style={{ marginTop: 40 }}>Two-Factor Authentication</h6>
            (Only for accounts registered by email and password)

      {
        contactDetails && contactDetails.isTwoFactorEnabled || isActivated ?
          <>
            <h6>you have already enabled two factor auth</h6>
            <OutlinedButton onClick={onDisable2FA}>Disable 2FA</OutlinedButton>
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
              onClick={onEnable2FA}
            >
              Enable Two-Factor Auth
          </ContainedButton>
          </>
      }
    </>
  )
}

export default PasswordAndAuthentication
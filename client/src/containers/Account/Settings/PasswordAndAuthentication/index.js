import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoogleAuthenticatorQrCode } from '../../../../redux/actions/authenticationActions'
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'reactstrap';

import ChangePassword from './ChangePassword'
import Enable2FA, { EnableSuccess } from './Enable2FA'
import Disable2FA from './Disable2FA'

function PasswordAndAuthentication({ setModalTitle, setModalContent, closeModal }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { contactDetails } = useSelector((state) => state.account);
  const { isActivated } = useSelector((state) => state.two_factor_auth);

  useEffect(() => {
    if (isActivated) {
      setModalTitle('Enable Two Factor Authnetication')
      setModalContent(<EnableSuccess closeModal={closeModal} />)
    }
  }, [isActivated])

  const onEnable2FA = () => {
    dispatch(getGoogleAuthenticatorQrCode())

    setModalTitle('Enable Two Factor Authentication')
    setModalContent(<Enable2FA />)
  }

  const onDisable2FA = () => {
    setModalTitle('Disable Two Factor Authnetication')
    setModalContent(<Disable2FA />)
  }

  return (
    <>
      {/* disable if registered / signed in by google */}
      <Button
        color="info"
        size="sm"
        onClick={() => {
          setModalTitle('Change your password')
          setModalContent(<ChangePassword closeModal={closeModal} />)
        }}
      >
        {t('settings.change_password')}
      </Button>

      <h6 style={{ marginTop: 40 }}>Two-Factor Authentication</h6>
            (Only for accounts registered by email and password)

      {contactDetails && contactDetails.isTwoFactorEnabled || isActivated ?
        <>
          <h6>you have already enabled two factor auth</h6>
          <button onClick={onDisable2FA}>Disable 2FA</button>
        </>
        :
        <>
          <p>
            Protect your account with an extra layer of security. Once configured, you'll be required
            to enter both your password and an authentication code from your mobile phone in order to
            sign in
          </p>

          {/* disable button if register via google */}
          <Button
            color="info"
            size="sm"
            type="button"
            onClick={onEnable2FA}
          >
            Enable Two-Factor Auth
          </Button>
        </>
      }

    </>
  )
}

export default PasswordAndAuthentication
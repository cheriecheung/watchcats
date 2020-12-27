import React from 'react';
import {
  HorizontalDivider,
  LinkButton,
  Modal,
  VerticalCard
} from '../../../components/UIComponents'
import { themeColor } from '../../../style/theme'
import Google from './containers/Google'
import Local from './containers/Local'

import { useAuthentication, useRegister } from '../viewModel';

function Register() {
  const {
    t,
    appError,
    isLoadingGoogleLogin,
    isLoadingRegister
  } = useAuthentication();

  const {
    closeModal,
    showModal,
    onGoogleLogin,
    localRegisterProps
  } = useRegister()

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
      <VerticalCard variant="authentication">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>{t('register.title')}</h4>
          <LinkButton to="/login">
            {t('login.title')}
          </LinkButton>
        </div>

        <Google
          t={t}
          onGoogleLogin={onGoogleLogin}
          isLoading={isLoadingGoogleLogin}
        />

        <HorizontalDivider>{t('form.or')}</HorizontalDivider>

        <Local
          t={t}
          localRegisterProps={localRegisterProps}
          appError={appError}
          isLoading={isLoadingRegister}
        />
      </VerticalCard>

      <Modal
        centered
        visible={showModal}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <i className="far fa-check-circle fa-3x" style={{ color: themeColor.green }} />
        <br />
        <br />
        <h5>{t('success.register1')}</h5>
        <p>{t('success.register2')}</p>
        <b style={{ fontWeight: 'bold' }}>{t('success.register3')}</b>
        <p>{t('success.check_spam_folder')}</p>
      </Modal>
    </div >
  )
}

export default Register;
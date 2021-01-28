import React from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { OutlinedButton, Spinner } from '../UIComponents'
import google_logo from '../../assets/images/google_logo.png'

function GoogleLoginButton({ onClick, isLoading }) {
  const { t } = useTranslation();

  return (
    <OutlinedButton
      type="button"
      style={{ width: '100%', marginTop: 10 }}
      onClick={onClick}
    >
      <img
        src={google_logo}
        style={{ width: 'auto', height: '70%', marginLeft: '-10px', marginRight: 10 }}
      />
      {t('login.google_login')}
      {isLoading && <Spinner colored={true.toString()} />}
    </OutlinedButton>
  )
}

export default GoogleLoginButton;

GoogleLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
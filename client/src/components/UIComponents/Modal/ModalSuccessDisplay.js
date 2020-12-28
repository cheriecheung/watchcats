import React from 'react';
import PropTypes from 'prop-types';
import { ContainedButton } from '../../UIComponents'
import { themeColor } from '../../../style/theme'

function ModalSuccessDisplay({ message, onClick }) {
  return (
    <>
      <br />
      <i
        className="far fa-check-circle fa-4x"
        style={{ color: themeColor.green }}
      />
      <br />
      <br />
      <p>{message}</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ContainedButton onClick={onClick}>OK</ContainedButton>
      </div>
    </>
  )
}

export default ModalSuccessDisplay

ModalSuccessDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
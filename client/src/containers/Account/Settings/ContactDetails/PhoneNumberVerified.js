import React from 'react';
import { ContainedButton } from '../../../../components/UIComponents'

function PhoneNumberVerified({ t, closeModal }) {

  return (
    <>
      <i className="far fa-check-circle fa-4x" />
      <br />
      <br />
      <p>You have successfully verified your phone</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ContainedButton onClick={closeModal}>OK</ContainedButton>
      </div>
    </>
  )
}

export default PhoneNumberVerified
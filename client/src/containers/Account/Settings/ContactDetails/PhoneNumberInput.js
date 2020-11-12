import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function PhoneNumberInput({ phoneNumberInputProps }) {
  const {
    inputPhoneNumber,
    setInputPhoneNumber,
    savePhoneNumber
  } = phoneNumberInputProps

  return (
    <div style={{ textAlign: 'center' }}>
      <i className="fas fa-mobile-alt fa-4x mb-3" />

      <p>You will receive a text message with a verification code.</p>
      <p>Your phone number is only used for verification and will not be shared to anyone on this application.</p>

      <PhoneInput
        country={'nl'}
        value={inputPhoneNumber}
        onChange={phone => setInputPhoneNumber(phone)}
        placeholder=""
        className="phone-input"
      />

      <br />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" onClick={savePhoneNumber}>Submit</button>
      </div>
    </div>
  )
}

export default PhoneNumberInput
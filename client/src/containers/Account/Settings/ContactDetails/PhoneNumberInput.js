import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useDispatch, useSelector } from 'react-redux';
import { submitPhoneNumber } from '../../../../redux/actions/accountActions'
import PhoneNumberVerification from './PhoneNumberVerification'

function PhoneNumberInput({ setModalTitle, setModalContent, setPhone, closeModal }) {
  const dispatch = useDispatch();
  const { changePhoneNumberStep } = useSelector((state) => state.account);

  const [phoneNumber, setPhoneNumber] = useState()

  useEffect(() => {
    if (changePhoneNumberStep === 'submitted') {
      setModalTitle('Verify Phone Number')
      setModalContent(
        <PhoneNumberVerification
          closeModal={closeModal}
          setPhone={() => setPhone(phoneNumber)}
        />)
    }
  }, [changePhoneNumberStep])

  return (
    <div style={{ textAlign: 'center' }}>
      <i className="fas fa-mobile-alt fa-4x mb-3" />

      <p>You will receive a text message with a verification code.</p>
      <p>Your phone number is only used for verification and will not be shared to anyone on this application.</p>

      <PhoneInput
        country={'nl'}
        value={phoneNumber}
        onChange={phone => setPhoneNumber(phone)}
        placeholder=""
        className="phone-input"
      />

      <br />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => {
          dispatch(submitPhoneNumber(phoneNumber))
        }}>Submit</button>
      </div>
    </div>
  )
}

export default PhoneNumberInput
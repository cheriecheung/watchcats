import React from 'react';
import { useDispatch } from 'react-redux';
import { resendVerficationCode } from '../../../../redux/actions/accountActions'
import styled from 'styled-components';

const CodeInput = styled.input`
    margin: 0 4px;
    padding: 0;
    width: 40px;
    height: 60px;
    border: 2px solid #D3D3D3;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    outline: none;
`

function PhoneNumberVerification({ phoneVerificationProps }) {
  const dispatch = useDispatch();
  const { code, processInput, onKeyUp, updateRef } = phoneVerificationProps

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Enter the 6-digit code we sent to your phone.</p>

      {code.map((num, idx) => {
        return (
          <CodeInput
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            // readOnly={loading}
            onChange={e => {
              console.log({ code })
              processInput(e, idx)
            }}
            onKeyUp={e => onKeyUp(e, idx)}
            ref={ref => updateRef(ref)}
          />
        );
      })}

      <br />
      <br />
      {/* {changePhoneNumberStep === 'verificationFailed' &&
            <span>code invalid. please try again</span>
          } */}
      <button onClick={() => dispatch(resendVerficationCode())}>Resend Code</button>
    </div>
  )
}

export default PhoneNumberVerification
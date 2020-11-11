import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resendVerficationCode, verifyPhoneNumber } from '../../../../redux/actions/accountActions'
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

function PhoneNumberVerification({ setPhone, closeModal }) {
  const dispatch = useDispatch();
  const { changePhoneNumberStep } = useSelector((state) => state.account);

  const codeLength = 6
  const [code, setCode] = useState([...Array(codeLength)].map(() => ""));
  const [isVerified, setIsVerified] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (changePhoneNumberStep === 'verified') {
      setIsVerified(true)
      setPhone && setPhone();
    }
  }, [changePhoneNumberStep])

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;

    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    if (slot !== codeLength - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every(num => num !== "")) {
      setTimeout(() => {
        const filledInCode = newCode.join('')
        dispatch(verifyPhoneNumber(filledInCode))
      }, 500)
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {isVerified ?
        <>
          <i className="far fa-check-circle fa-3x" />
          <br />
          <br />
          <p>You have successfully verified your phone</p>
          <button onClick={() => {
            dispatch({ type: 'PHONE_NUMBER_SUBMITTED', changePhoneNumberStep: 'fillInPhone' })
            closeModal && closeModal()
          }}>OK</button>
        </>
        :
        <>
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
                onChange={e => processInput(e, idx)}
                onKeyUp={e => onKeyUp(e, idx)}
                ref={ref => inputs.current.push(ref)}
              />
            );
          })}

          <br />
          <br />
          {changePhoneNumberStep === 'verificationFailed' &&
            <span>code invalid. please try again</span>
          }
          <button onClick={() => dispatch(resendVerficationCode())}>Resend Code</button>
        </>
      }
    </div>
  )
}

export default PhoneNumberVerification
import React, { useEffect, useState, useRef } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';
import { FieldLabel, TextField, SectionContainer, SectionTitle } from '../../../components/FormComponents';

import { useDispatch, useSelector } from 'react-redux';
import { getContactDetails, submitPhoneNumber, verifyPhoneNumber } from '../../../redux/actions/accountActions'

const Button = styled.button`
    background: none;
    border: none;
    outline: none !important;
    
    &:hover{
        color: pink
    }
`

const BreakLine = styled.div`
    width: 1px;
    height: 20px;
    background: #929292;
    margin: 0 20px;

    @media (max-width: 769px) {
        display: none;
    }
`

const ContentBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 769px) {
        flex-direction: row;
    }
`

function ContactDetails({ setModal }) {
    const dispatch = useDispatch();
    const { contactDetails } = useSelector((state) => state.account);

    const [email, setEmail] = useState(null);
    const [asteriskedEmail, setAsteriskedEmail] = useState('')
    const [revealEmail, setRevealEmail] = useState(false);

    const [phone, setPhone] = useState(null)
    const [asteriskedPhone, setAsteriskedPhone] = useState('')
    const [revealPhone, setRevealPhone] = useState(false);

    useEffect(() => {
        if (contactDetails) {
            const { email, phone } = contactDetails;

            setEmail(email);

            const asteriskedEmailName = email.substr(0, email.indexOf('@')).replace(/./g, '*');
            const emailDomain = email.substr(email.indexOf("@") + 1);
            setAsteriskedEmail(`${asteriskedEmailName}@${emailDomain}`)

            if (phone) {
                setPhone(phone)

                const withoutLastFourDigits = phone.slice(0, -4).replace(/./g, '*')
                const lastFourDigits = phone.substr(phone.length - 4);
                setAsteriskedPhone(`${withoutLastFourDigits}${lastFourDigits}`)
            }
        }
    }, [contactDetails])

    useEffect(() => {
        dispatch(getContactDetails())
    }, [dispatch])

    return (
        <ContentBox>
            <div style={{ flexBasis: '45%' }}>
                <FieldLabel>Email</FieldLabel>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {revealEmail ? <span>{email}</span> : <span>{asteriskedEmail}</span>}

                    <div style={{ display: 'flex' }}>
                        {revealEmail ?
                            <Button onClick={() => setRevealEmail(false)}>Hide</Button>
                            :
                            <Button onClick={() => setRevealEmail(true)}>Reveal</Button>
                        }
                        <Button style={{ float: 'right' }}>Edit</Button>
                    </div>
                </div>
            </div>

            <BreakLine style={{ height: 50 }} />

            <div style={{ flexBasis: '45%' }}>
                <FieldLabel>Phone number</FieldLabel>

                {phone ?
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {revealPhone ? <span>{phone}</span> : <span>{asteriskedPhone}</span>}

                        <div style={{ display: 'flex' }}>
                            {revealPhone ?
                                <Button onClick={() => setRevealPhone(false)}>Hide</Button>
                                :
                                <Button onClick={() => setRevealPhone(true)}>Reveal</Button>
                            }
                            <Button style={{ float: 'right' }}>Remove</Button>
                            <Button
                                style={{ float: 'right' }}
                                onClick={() => setModal('Enter a Phone Number', <EnterPhoneNumber setModal={setModal} />)}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => setModal('Enter a Phone Number', <EnterPhoneNumber setModal={setModal} />)}>Add</Button>
                    </div>
                }

            </div>
        </ContentBox>
    )
}

export default ContactDetails;

function EnterPhoneNumber({ setModal }) {
    const dispatch = useDispatch();
    const { verifyPhone, phoneVerified } = useSelector((state) => state.account);

    const [phoneNumber, setPhoneNumber] = useState()

    useEffect(() => {
        console.log({ _verifyPhone: verifyPhone })

        if (verifyPhone) {
            setModal('Verify Phone Number', <VerifyNumber />)
        }
    }, [verifyPhone])

    useEffect(() => {
        console.log({ _phoneVerified: phoneVerified })

        if (phoneVerified) {
            // setModal({ show: false })
        }
    }, [phoneVerified])

    return (
        <div style={{ textAlign: 'center' }}>
            <i className="fas fa-mobile-alt fa-4x mb-3" />

            <p>You will receive a text message with a verification code.</p>
            <p>Your phone number is only used for verification and will not be shared to anyone on this application.</p>

            <PhoneInput
                country={'nl'}
                value={phoneNumber}
                onChange={phone => {
                    console.log({ phoneNumber })
                    setPhoneNumber(phone)
                }}
                placeholder=""
                className="phone-input"
            />

            <br />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => dispatch(submitPhoneNumber())}>Submit</button>
            </div>
        </div>
    )
}

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

function VerifyNumber() {
    const dispatch = useDispatch();

    const codeLength = 6
    const [code, setCode] = useState([...Array(codeLength)].map(() => ""));
    const inputs = useRef([]);

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

            <button>Resend Code</button>
        </div >
    )
}
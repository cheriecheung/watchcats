import React, { useEffect, useState, useRef } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';
import { FieldLabel, TextField, SectionContainer, SectionTitle } from '../../../components/FormComponents';

import { useDispatch, useSelector } from 'react-redux';
import { getContactDetails, resendVerficationCode, submitPhoneNumber, verifyPhoneNumber, deletePhoneNumber } from '../../../redux/actions/accountActions'

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

function ContactDetails({ setModalTitle, setModalContent, closeModal }) {
    const dispatch = useDispatch();
    const { contactDetails, changePhoneNumberStep } = useSelector((state) => state.account);

    const [email, setEmail] = useState(null);
    const [asteriskedEmail, setAsteriskedEmail] = useState('')
    const [revealEmail, setRevealEmail] = useState(false);

    const [phone, setPhone] = useState(null)
    const [asteriskedPhone, setAsteriskedPhone] = useState('')
    const [revealPhone, setRevealPhone] = useState(false);

    useEffect(() => {
        if (changePhoneNumberStep === 'removed') {
            dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
            setPhone('')
        }
    }, [changePhoneNumberStep])

    useEffect(() => {
        console.log({ contactDetails })

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
        if (phone) {
            dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });

            setPhone(phone)

            const withoutLastFourDigits = phone.slice(0, -4).replace(/./g, '*')
            const lastFourDigits = phone.substr(phone.length - 4);
            setAsteriskedPhone(`${withoutLastFourDigits}${lastFourDigits}`)
        }
    }, [phone])

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
                        {/* <Button style={{ float: 'right' }}>Edit</Button> */}
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
                            <Button
                                style={{ float: 'right' }}
                                onClick={() => dispatch(deletePhoneNumber())}
                            >
                                Remove
                            </Button>
                            <Button
                                style={{ float: 'right' }}
                                onClick={() => {
                                    dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });

                                    setModalTitle('Enter a Phone Number')
                                    setModalContent(
                                        <EnterPhoneNumber
                                            setPhone={setPhone}
                                            setModalTitle={setModalTitle}
                                            setModalContent={setModalContent}
                                            closeModal={closeModal}
                                        />
                                    )
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                    :
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => {
                            dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });

                            setModalTitle('Enter a Phone Number')
                            setModalContent(
                                <EnterPhoneNumber
                                    setPhone={setPhone}
                                    setModalTitle={setModalTitle}
                                    setModalContent={setModalContent}
                                    closeModal={closeModal}
                                />
                            )
                        }}
                        >
                            Add
                        </Button>
                    </div>
                }

            </div>
        </ContentBox>
    )
}

export default ContactDetails;

function EnterPhoneNumber({ setModalTitle, setModalContent, setPhone, closeModal }) {
    const dispatch = useDispatch();
    const { changePhoneNumberStep } = useSelector((state) => state.account);

    const [phoneNumber, setPhoneNumber] = useState()

    useEffect(() => {
        if (changePhoneNumberStep === 'submitted') {
            setModalTitle('Verify Phone Number')
            setModalContent(
                <VerifyNumber
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

function VerifyNumber({ setPhone, closeModal }) {
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
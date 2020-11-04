import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';
import { FieldLabel, TextField, SectionContainer, SectionTitle } from '../../../components/FormComponents';

import { useDispatch, useSelector } from 'react-redux';
import { getContactDetails } from '../../../redux/actions/accountActions'

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

    const [email, setEmail] = useState();
    const [asteriskedEmail, setAsteriskedEmail] = useState('')
    const [revealEmail, setRevealEmail] = useState(false);

    const [phone, setPhone] = useState()
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

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {revealPhone ? <span>{phone}</span> : <span>{asteriskedPhone}</span>}

                    <div style={{ display: 'flex' }}>
                        {revealPhone ?
                            <Button onClick={() => setRevealPhone(false)}>Hide</Button>
                            :
                            <Button onClick={() => setRevealPhone(true)}>Reveal</Button>
                        }
                        <Button style={{ float: 'right' }} onClick={() => setModal('Enter a Phone Number', <EnterPhoneNumber />)}>Edit</Button>
                    </div>
                </div>
            </div>
        </ContentBox>
    )
}

export default ContactDetails;

function EnterPhoneNumber() {
    const [phoneNumber, setPhoneNumber] = useState()

    return (
        <>
            <i class="fas fa-mobile-alt fa-4x mb-3" />

            <p>You will receive a text message with a verification code.</p>
            <p>Your phone number is only used for verification and will not be shared to anyone on this application.</p>

            <PhoneInput
                country={'nl'}
                value={phoneNumber}
                onChange={phone => setPhoneNumber(phone)}
                placeholder=""
            />

            <br />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button>Submit</button>
            </div>
        </>
    )
}
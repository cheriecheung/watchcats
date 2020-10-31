import React, { useEffect, useState } from 'react';
import { FieldLabel, TextField, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import PhoneInput from 'react-phone-number-input'
import styled from 'styled-components';

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

const originalEmail = 'testing@gmail.com'
const originalPhone = '+85268615357'

function ContactDetails({ setModal }) {
    const [email, setEmail] = useState();
    const [asteriskedEmail, setAsteriskedEmail] = useState('')
    const [revealEmail, setRevealEmail] = useState(false);

    const [phone, setPhone] = useState()
    const [asteriskedPhone, setAsteriskedPhone] = useState('')
    const [revealPhone, setRevealPhone] = useState(false);

    useEffect(() => {
        setEmail(originalEmail);

        const asteriskedEmailName = originalEmail.substr(0, originalEmail.indexOf('@')).replace(/./g, '*');
        const emailDomain = originalEmail.substr(originalEmail.indexOf("@") + 1);
        setAsteriskedEmail(`${asteriskedEmailName}@${emailDomain}`)

        setPhone(originalPhone)

        const withoutLastFourDigits = originalPhone.slice(0, -4).replace(/./g, '*')
        const lastFourDigits = originalPhone.substr(originalPhone.length - 4);
        setAsteriskedPhone(`${withoutLastFourDigits}${lastFourDigits}`)
    }, [])

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
                value={phoneNumber}
                onChange={setPhoneNumber}
            />
        </>
    )
}
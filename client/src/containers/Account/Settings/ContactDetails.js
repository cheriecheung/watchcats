import React, { useEffect, useState } from 'react';
import { FieldLabel, TextField, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import PhoneInput from 'react-phone-number-input'

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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FieldLabel>Email</FieldLabel>
            <div>
                {revealEmail ?
                    <>
                        <span>{email}</span>
                        <button onClick={() => setRevealEmail(false)}>Hide</button>
                    </>
                    :
                    <>
                        <span>{asteriskedEmail}</span>
                        <button onClick={() => setRevealEmail(true)}>Reveal</button>
                    </>
                }
            </div>


            <br />

            <FieldLabel>Phone number</FieldLabel>
            <div>
                {revealPhone ?
                    <>
                        <span>{phone}</span>
                        <button onClick={() => setRevealPhone(false)}>Hide</button>
                    </>
                    :
                    <>
                        <span>{asteriskedPhone}</span>
                        <button onClick={() => setRevealPhone(true)}>Reveal</button>
                    </>}
                <button style={{ float: 'right' }} onClick={() => setModal('Enter a Phone Number', <EnterPhoneNumber />)}>Edit</button>
            </div>
        </div>
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
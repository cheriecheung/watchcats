import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FieldLabel } from '../../../../components/FormComponents';

import { useDispatch, useSelector } from 'react-redux';
import { getContactDetails, deletePhoneNumber } from '../../../../redux/actions/accountActions'

import PhoneNumberInput from './PhoneNumberInput'

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
                    <PhoneNumberInput
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
                <PhoneNumberInput
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
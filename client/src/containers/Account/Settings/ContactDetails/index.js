import React, { useState } from 'react';
import styled from 'styled-components';
import { FieldLabel } from '../../../../components/FormComponents';
import { VerticalDivider } from '../../../../components/UIComponents';
import { Modal, Switch } from 'antd';

import { useDispatch } from 'react-redux';

import PhoneNumberInput from './PhoneNumberInput'
import PhoneNumberVerification from './PhoneNumberVerification'

const Button = styled.button`
    background: none;
    border: none;
    outline: none !important;
    
    &:hover{
        color: pink
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

function ContactDetails({
  contactDetailsProps,
  phoneNumberInputProps,
  phoneVerificationProps
}) {
  const dispatch = useDispatch();

  const {
    email,
    asteriskedEmail,
    phone,
    asteriskedPhone,
    revealEmail,
    setRevealEmail,
    revealPhone,
    setRevealPhone,
    deletePhone
  } = contactDetailsProps

  const { changePhoneNumberStep } = phoneNumberInputProps;

  const [showModal, setShowModal] = useState(false);

  return (
    <ContentBox>
      <Modal
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        {changePhoneNumberStep === 'submitted' &&
          <PhoneNumberVerification
            phoneVerificationProps={phoneVerificationProps}
            closeModal={() => setShowModal(false)}
          />}
        {changePhoneNumberStep === 'input' &&
          <PhoneNumberInput phoneNumberInputProps={phoneNumberInputProps} />
        }

        {changePhoneNumberStep === 'verified' &&
          <>
            <i className="far fa-check-circle fa-3x" />
            <br />
            <br />
            <p>You have successfully verified your phone</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </>
        }
      </Modal>

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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span>Receive notifications</span>
          <Switch defaultChecked={false} onChange={(checked) => console.log({ checked })} />
        </div>
      </div>

      <VerticalDivider />

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
                onClick={deletePhone}
              >
                Remove
              </Button>
              <Button
                style={{ float: 'right' }}
                onClick={() => {
                  dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
                  setShowModal(true)
                }}>
                Edit
              </Button>
            </div>
          </div>
          :
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => {
              dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
              setShowModal(true)
            }}
            >
              Add
            </Button>
          </div>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span>Receive notifications</span>
          <Switch defaultChecked={true} disabled={!phone} onChange={(checked) => console.log({ checked })} />
        </div>
      </div>
    </ContentBox>
  )
}

export default ContactDetails;
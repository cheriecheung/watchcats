import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FieldLabel } from '../../../../components/FormComponents';
import { Modal } from 'antd';

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

function ContactDetails({
  modalProps,
  contactDetailsProps,
  phoneNumberInputProps,
  phoneVerificationProps
}) {
  const dispatch = useDispatch();
  const {
    closeModal,
    modalTitle,
    showModal,
    setShowModal
  } = modalProps;

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

  const { changePhoneNumberStep } = phoneNumberInputProps

  return (
    <ContentBox>
      <Modal
        centered
        title={modalTitle}
        visible={showModal}
        onCancel={closeModal}
        footer={null}
      >
        {changePhoneNumberStep === 'submitted' &&
          <PhoneNumberVerification
            phoneVerificationProps={phoneVerificationProps}
            closeModal={closeModal}
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
            <button onClick={() => closeModal && closeModal()}>OK</button>
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

      </div>
    </ContentBox>
  )
}

export default ContactDetails;
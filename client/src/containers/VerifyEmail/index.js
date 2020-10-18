import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextField } from '../../components/FormComponents'
import { send_activation_email_schema } from '../Account/_validationSchema'
import { verifyEmail, getActivationEmail } from '../../_actions/userActions';

const SubmitButton = styled.button`
  background: #ffa195;
  height: 35px;
  margin-left: 15px;
  padding: 5px 25px;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  outline: none !important;
`;

function Home() {
  const { t, i18n } = useTranslation();
  const { token } = useParams();
  const dispatch = useDispatch();
  const activate = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  useEffect(() => {
    console.log({ activate, payload: activate.payload })
  }, [activate])

  const renderResponse = () => {
    switch (activate.payload) {
      case 'Activation failed':
        return <SendActivationEmail />
      case 'Activation successful':
        return (
          <>
            <br />
            <span>Activation successful. You are now able to log in.</span>
          </>
        )
      case 'Email requested':
        return (
          <>
            <br />
            <br />
            <p>If the email you provided is registered, a link will be sent to activate your account.</p>
            <p>Be sure to check the spam / junk mailbox if the email is not found in the main inbox</p>
          </>
        )
      default:
        return null
    }
  }

  return renderResponse();
}

export default Home;

function SendActivationEmail() {
  const dispatch = useDispatch();

  const resolver = yupResolver(send_activation_email_schema);
  const methods = useForm({ defaultValues: { email: '' }, resolver });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    const { email } = data;
    dispatch(getActivationEmail(email));
  }

  return (
    <>
      <h5 style={{ marginTop: 30 }}>Your verification link has expired</h5>
      <p >Please enter your registered email below to get another link to activate your account.</p>
      <br />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField name="email" style={{ width: 200 }} />

            <SubmitButton>
              Submit
          </SubmitButton>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

import React from 'react';
import { getActivationEmail } from '../../../../redux/actions/authenticationActions';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { TextField } from '../../../../components/FormComponents'
import { send_email_schema } from '../../../Account/_validationSchema'
import styled from 'styled-components';

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


function Unsuccessful() {
  const dispatch = useDispatch();

  const resolver = yupResolver(send_email_schema);
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

export default Unsuccessful
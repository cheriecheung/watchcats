
import React from 'react';
import { useDispatch } from 'react-redux';
import { getActivationEmail } from '../../../../redux/actions/authenticationActions';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  email_verification_default_values as defaultValues,
  send_email_schema
} from '../../_formConfig'

import { TextField } from '../../../../components/FormComponents'
import { SubmitButton } from '../../_styledComponents'

function Unsuccessful() {
  const dispatch = useDispatch();

  const resolver = yupResolver(send_email_schema);
  const methods = useForm({ defaultValues, resolver });
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
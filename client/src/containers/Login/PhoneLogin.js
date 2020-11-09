import React from 'react'
import { SectionContainer } from '../../components/FormComponents'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { phoneLogin } from '../../redux/actions/userActions';

import { useForm, FormProvider } from 'react-hook-form';
import { FieldLabel, TextField } from '../../components/FormComponents'

const defaultValues = {
  code: ''
}

function PhoneLogin() {
  const dispatch = useDispatch({ defaultValues });

  const methods = useForm();
  const { handleSubmit, reset, setValue, errors, watch } = methods;

  const handleLogin = (data) => {
    dispatch(phoneLogin(data));
  };

  return (
    <SectionContainer style={{ width: '40vw', marginTop: 30 }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <FieldLabel>Code</FieldLabel>
          <TextField name="name" />
        </form>
      </FormProvider>
    </SectionContainer>
  )
}

export default PhoneLogin
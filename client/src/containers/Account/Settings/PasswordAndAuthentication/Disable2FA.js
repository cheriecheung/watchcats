import React from 'react';
import { useDispatch } from 'react-redux';
import { disableTwoFactor } from '../../../../redux/actions/authenticationActions'
import { TextField } from '../../../../components/FormComponents';
import { ContainedButton } from '../../../../components/UIComponents';
import { useForm, FormProvider } from 'react-hook-form';

function Disable2FA() {
  const dispatch = useDispatch();

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    const { code } = data;
    dispatch(disableTwoFactor(code))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
        <TextField name="code" />

        <ContainedButton type="submit">Submit</ContainedButton>
      </form>
    </FormProvider>
  )
}

export default Disable2FA
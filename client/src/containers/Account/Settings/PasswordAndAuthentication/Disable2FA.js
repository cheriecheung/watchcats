import React from 'react';
import { TextField } from '../../../../components/FormComponents';
import { ContainedButton } from '../../../../components/UIComponents';
import { useDisable2FA } from '../viewModel';

function Disable2FA({ t }) {
  const {
    FormProvider,
    methods,
    onSubmit
  } = useDisable2FA();

  const { handleSubmit } = methods;

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
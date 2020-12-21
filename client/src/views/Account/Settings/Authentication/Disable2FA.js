import React from 'react';
import { OtpInput } from '../../../../components/FormComponents';
import { ContainedButton, ErrorMessage, Image, ImageContainer } from '../../../../components/UIComponents';
import { useDisable2FA } from '../viewModel';

function Disable2FA({ t }) {
  const {
    FormProvider,
    methods,
    onSubmit,
    appError
  } = useDisable2FA();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageContainer>
            <Image url="https://whooptous.com/wp-content/uploads/2020/05/unnamed.png" />
          </ImageContainer>

          <br />
          <p style={{ textAlign: 'center' }}>Enter the 6-digit code in the Google Authenticator app on your phone.</p>

          <OtpInput name="code" />
        </div>

        <br />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ContainedButton type="submit">Submit</ContainedButton>
        </div>

        {appError && <ErrorMessage type={appError} />}
      </form>
    </FormProvider>
  )
}

export default Disable2FA
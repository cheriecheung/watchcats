import React from 'react';
import { ContainedButton } from '../../../../components/UIComponents'
import { OtpInput } from '../../../../components/FormComponents'
import { usePhoneNumberVerification } from '../viewModel';

function PhoneNumberVerification({ t }) {
  const {
    FormProvider,
    methods,
    onSubmitOtp,
    resendCode
  } = usePhoneNumberVerification();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitOtp)} style={{ textAlign: 'center' }}>

        <p>Enter the 6-digit code we sent to your phone.</p>

        <OtpInput name="otp" />

        <br />
        <br />
        {/* {changePhoneNumberStep === 'verificationFailed' &&
            <span>code invalid. please try again</span>
          } */}
        <ContainedButton onClick={resendCode}>Resend Code</ContainedButton>
        <ContainedButton type="submit">Submit</ContainedButton>
      </form>
    </FormProvider>
  )
}

export default PhoneNumberVerification
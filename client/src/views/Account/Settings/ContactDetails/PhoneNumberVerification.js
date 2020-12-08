import React from 'react';
import { ContainedButton, ErrorMessage } from '../../../../components/UIComponents'
import { OtpInput } from '../../../../components/FormComponents'
import { usePhoneNumberVerification } from '../viewModel';

function PhoneNumberVerification({ t, accountError }) {
  const {
    FormProvider,
    methods,
    onSubmitOtp,
    resendCode
  } = usePhoneNumberVerification();

  const { handleSubmit } = methods;

  const _renderErrorMessage = () => {
    switch (accountError) {
      case 'ERROR/OTP_INVALID':
        return 'Verification code invalid. Please try again.'
      case 'ERROR/PHONE_VERIFICATION_FAILED':
        return 'Unable to verify code. Please try again.'
      case 'ERROR/PHONE_SAVING_FAILED':
        return 'Failed to save phone. Please try again.'
      default:
        break;
    }
  }

  console.log({ accountError })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitOtp)} style={{ textAlign: 'center' }}>
        <i className="fas fa-sms fa-4x mb-3" />

        {/* within timeline? */}
        <p>Enter the 6-digit code we sent to your phone via SMS.</p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <OtpInput name="otp" />
        </div>

        {accountError && <ErrorMessage>{_renderErrorMessage()}</ErrorMessage>}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ContainedButton type="button" onClick={resendCode}>Resend Code</ContainedButton>
          <ContainedButton type="submit">Submit</ContainedButton>
        </div>
      </form>
    </FormProvider>
  )
}

export default PhoneNumberVerification
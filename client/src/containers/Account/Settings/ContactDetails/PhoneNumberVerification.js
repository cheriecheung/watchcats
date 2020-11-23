import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resendVerficationCode } from '../../../../redux/actions/accountActions'
import { ContainedButton } from '../../../../components/UIComponents'
import { OtpInput } from '../../../../components/FormComponents'
import { useForm, FormProvider } from 'react-hook-form';

const defaultValues = { otp: '' }

function PhoneNumberVerification({ phoneVerificationProps }) {
  const dispatch = useDispatch();
  const { onSubmitOtp } = phoneVerificationProps

  const methods = useForm({ defaultValues });
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
        <ContainedButton onClick={() => dispatch(resendVerficationCode())}>Resend Code</ContainedButton>
        <ContainedButton type="submit">Submit</ContainedButton>
      </form>
    </FormProvider>
  )
}

export default PhoneNumberVerification
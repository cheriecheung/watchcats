import React from 'react';
import { ContainedButton, ErrorMessage } from '../../../../components/UIComponents'
import { OtpInput } from '../../../../components/FormComponents'
import { usePhoneNumberVerification } from '../viewModel';

function PhoneNumberVerification({ t, accountError, inputPhoneNumber }) {
  const {
    FormProvider,
    methods,
    onSubmitOtp,
    resendCode
  } = usePhoneNumberVerification();

  return (
    <FormProvider {...methods}>
      <form style={{ textAlign: 'center' }}>
        <i className="fas fa-sms fa-4x mb-3" />

        <p>
          {t('settings.enter_sms_code')}
          <br />
          {t('settings.code_to_expire')}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <OtpInput name="otp" />
        </div>

        {accountError && <ErrorMessage type={accountError} />}

        <br />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ContainedButton
            type="button"
            onClick={() => resendCode(inputPhoneNumber)}
          >
            {t('settings.resend_code')}
          </ContainedButton>
          <ContainedButton
            type="button"
            onClick={() => onSubmitOtp(inputPhoneNumber)}
          >
            {t('form.submit')}
          </ContainedButton>
        </div>
      </form>
    </FormProvider>
  )
}

export default PhoneNumberVerification
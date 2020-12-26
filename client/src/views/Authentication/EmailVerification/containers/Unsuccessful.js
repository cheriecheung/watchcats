
import React from 'react';
import { TextField } from '../../../../components/FormComponents'
import { Alert, ContainedButton } from '../../../../components/UIComponents';

function Unsuccessful({ t, unsuccessfulProps }) {
  const { FormProvider, methods, onSubmit, emailSubmitted } = unsuccessfulProps
  const { handleSubmit } = methods;

  return (
    <>
      {/* rediret to login page when already activated */}

      <h5>{t('email_verification.error_title')}</h5>
      <p>{t('email_verification.error_description')}</p>
      <br />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {emailSubmitted ?
            <Alert type="success">
              {t('email_verification.response')}
            </Alert>
            :
            <>
              <TextField name="email" />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ContainedButton>
                  {t('form.submit')}
                </ContainedButton>
              </div>
            </>
          }
        </form>
      </FormProvider>
    </>
  )
}

export default Unsuccessful
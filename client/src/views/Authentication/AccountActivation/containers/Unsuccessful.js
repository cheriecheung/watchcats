
import React from 'react';
import { TextField } from '../../../../components/FormComponents'
import { Alert, ContainedButton } from '../../../../components/UIComponents';

function Unsuccessful({ t, unsuccessfulProps }) {
  const { FormProvider, methods, onSubmit, emailSubmitted } = unsuccessfulProps
  const { handleSubmit } = methods;

  return (
    <>
      <i className="fas fa-exclamation-triangle fa-3x" />
      <br />
      <br />

      <h5>{t('account_activation.error_title')}</h5>
      <p>{t('account_activation.error_description')}</p>
      <br />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {emailSubmitted ?
            <Alert type="success">
              {t('account_activation.response')}
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
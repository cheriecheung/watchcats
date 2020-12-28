import React from 'react';
import { FieldLabel, TextField } from '../../../../components/FormComponents';
import {
  ContainedButton,
  ErrorAlert,
  Image,
  ImageContainer,
  LinkButton,
  Spinner
} from '../../../../components/UIComponents';
import { themeColor } from '../../../../style/theme'
import styled from 'styled-components'

import { useEnable2FA } from '../viewModel';

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  margin-bottom: 0;
  flex: 50%;
`;

function Enable2FA({ t, appError, isLoading }) {
  const {
    FormProvider,
    methods,
    qrCodeImage,
    onVerifyCode,
  } = useEnable2FA();

  const url = "https://support.google.com/accounts/answer/1066447?hl=en"

  return (
    <FormProvider {...methods}>
      <form style={{ textAlign: 'left' }}>

        <p>{t('settings.enable_2FA_description')}:</p>

        <Section>
          <ImageContainer
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image
              url="https://whooptous.com/wp-content/uploads/2020/05/unnamed.png"
              style={{ width: 70, height: 70 }}
            />
          </ImageContainer>
          <Description>
            <FieldLabel>{t('settings.enable_2FA_step1')}</FieldLabel>
            <p>
              {t('settings.enable_2FA_step1_detail1')}
              <LinkButton
                to={url}
                target="_blank"
                style={{ color: themeColor.peach }}
              >
                Google Authenticator
              </LinkButton>
              {t('settings.enable_2FA_step1_detail2')}
            </p>
          </Description>
        </Section>

        <hr style={{ marginTop: '-10px' }} />

        <Section>
          <ImageContainer>
            <Image url={qrCodeImage} />
          </ImageContainer>
          <Description>
            <FieldLabel>{t('settings.enable_2FA_step2')}</FieldLabel>
            <p>{t('settings.enable_2FA_step2_detail')}</p>
          </Description>
        </Section>

        <hr />

        <Section>
          <ImageContainer
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <i className="fas fa-mobile-alt fa-4x mb-3" />
          </ImageContainer>
          <Description>
            <FieldLabel>{t('settings.enable_2FA_step3')}</FieldLabel>
            <p>{t('settings.enable_2FA_step3_detail')}</p>


            <TextField name="verificationCode" placeholder="000 000" />
            <ContainedButton type="button" onClick={onVerifyCode}>
              {t('settings.activate')}
              {isLoading && <Spinner />}
            </ContainedButton>

            {appError && <ErrorAlert type={appError} />}
          </Description>
        </Section>
      </form>
    </FormProvider>
  )
}

export default Enable2FA
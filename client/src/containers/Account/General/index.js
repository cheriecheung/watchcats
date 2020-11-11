import React, { useEffect, useRef } from 'react';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { general_default_values as defaultValues } from '../_defaultValues'
import { general_schema } from '../_validationSchema'

import ProfilePicture from './ProfilePicture';
import PersonalInfo from './PersonalInfo';
import SocialMedia from './SocialMedia';

import { useGeneral } from './viewModal'

const resolver = yupResolver(general_schema)

function GeneralInfo({ activeKey }) {
  const personalInfoRef = useRef(null);
  const { t } = useTranslation();

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, errors } = methods;

  const { data, onSubmit, photoField, handlePreview, handleRemovePhoto, profilePicRemove } = useGeneral(activeKey);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      window.scrollTo(0, personalInfoRef.current.offsetTop - 20);
    }
  }, [errors])

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionContainer>
            <SectionTitle>{t('general_info.profile_picture')}</SectionTitle>

            <ProfilePicture
              setValue={setValue}
              reset={reset}
              photoField={photoField}
              handlePreview={handlePreview}
              handleRemovePhoto={handleRemovePhoto}
              profilePicRemove={profilePicRemove}
            />
          </SectionContainer>

          <SectionContainer ref={personalInfoRef}>
            <SectionTitle>{t('general_info.personal_info')}</SectionTitle>

            <PersonalInfo />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('general_info.social_media')}</SectionTitle>
            <SocialMedia />
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default GeneralInfo;

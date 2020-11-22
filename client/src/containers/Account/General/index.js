import React, { useEffect, useRef } from 'react';
import { FormButtons, SectionContainer } from '../../../components/FormComponents';
import { CardTitle } from '../../../components/UIComponents'
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { general_default_values as defaultValues } from '../_defaultValues'
import { general_schema } from '../_validationSchema'

import ProfilePicture from './ProfilePicture';
import PersonalInfo from './PersonalInfo';
import SocialMedia from './SocialMedia';

import { useGeneral } from './viewModel'

const resolver = yupResolver(general_schema)

function GeneralInfo() {
  const personalInfoRef = useRef(null);
  const { t } = useTranslation();

  const methods = useForm({ defaultValues, resolver });
  const { handleSubmit, reset, setValue, errors } = methods;

  const { data, onSubmit, photoField, handlePreview, handleRemovePhoto, profilePicRemove } = useGeneral();

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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionContainer>
          <CardTitle>{t('general_info.profile_picture')}</CardTitle>

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
          <CardTitle>{t('general_info.personal_info')}</CardTitle>

          <PersonalInfo />
        </SectionContainer>

        <SectionContainer>
          <CardTitle>{t('general_info.social_media')}</CardTitle>
          <SocialMedia />
        </SectionContainer>

        <FormButtons onClick={() => reset(defaultValues)} />
      </form>
    </FormProvider>
  );
}

export default GeneralInfo;

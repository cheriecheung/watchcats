import React from 'react';
import { FormButtons } from '../../../components/FormComponents';
import { CardTitle, HorizontalCard } from '../../../components/UIComponents'

import ProfilePicture from './ProfilePicture';
import PersonalInfo from './PersonalInfo';
import SocialMedia from './SocialMedia';

import { useGeneral } from './viewModel'

function GeneralInfo() {
  const {
    t,
    FormProvider,
    methods,
    onSubmit,
    resetForm,
    photoField,
    handlePreview,
    handleRemovePhoto,
    personalInfoRef
  } = useGeneral();

  const { handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HorizontalCard>
          <CardTitle>{t('general_info.profile_picture')}</CardTitle>

          <ProfilePicture
            t={t}
            reset={reset}
            photoField={photoField}
            handlePreview={handlePreview}
            handleRemovePhoto={handleRemovePhoto}
          />
        </HorizontalCard>

        <HorizontalCard ref={personalInfoRef}>
          <CardTitle>{t('general_info.personal_info')}</CardTitle>

          <PersonalInfo t={t} />
        </HorizontalCard>

        <HorizontalCard>
          <CardTitle>{t('general_info.social_media')}</CardTitle>
          <SocialMedia t={t} />
        </HorizontalCard>

        <FormButtons onClick={resetForm} />
      </form>
    </FormProvider>
  );
}

export default GeneralInfo;

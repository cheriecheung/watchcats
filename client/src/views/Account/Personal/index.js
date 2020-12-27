import React from 'react';
import { FormButtons } from '../../../components/FormComponents';
import { CardTitle, HorizontalCard } from '../../../components/UIComponents'

import ProfilePicture from './ProfilePicture';
import PersonalInfo from './PersonalInfo';
import SocialMedia from './SocialMedia';

import { usePersonal } from './viewModel'

function Personal() {
  const {
    t,
    FormProvider,
    methods,
    onSubmit,
    photoField,
    handlePreview,
    handleRemovePhoto,
    personalInfoRef,
    isLoadingRemoveProfilePicture,
    isLoadingSubmit
  } = usePersonal();

  const { handleSubmit, reset } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HorizontalCard>
          <CardTitle style={{ display: 'inline-block' }}>
            {t('personal_info.profile_picture')}
          </CardTitle>

          <ProfilePicture
            t={t}
            reset={reset}
            photoField={photoField}
            handlePreview={handlePreview}
            handleRemovePhoto={handleRemovePhoto}
            isLoading={isLoadingRemoveProfilePicture}
          />
        </HorizontalCard>

        <HorizontalCard ref={personalInfoRef}>
          <CardTitle>{t('personal_info.personal_info')}</CardTitle>

          <PersonalInfo t={t} />
        </HorizontalCard>

        <HorizontalCard>
          <div style={{ display: 'flex' }}>
            <CardTitle>{t('personal_info.social_media')}</CardTitle>
            <span style={{ fontSize: '0.9rem', marginLeft: 5 }}>
              ({t('personal_info.optional')})
              </span>
          </div>
          <SocialMedia t={t} />
        </HorizontalCard>

        <FormButtons isLoading={isLoadingSubmit} />
      </form>
    </FormProvider>
  );
}

export default Personal;

import React from 'react';
import { FormButtons } from '../../../components/FormComponents';
import { CardTitle, HorizontalCard, LinkButton } from '../../../components/UIComponents'
import 'react-day-picker/lib/style.css';

import AboutMe from './AboutMe';
import Experience from './Experience';
import Pricing from './Pricing';
import Availability from './Availability';

import { useCatSitter } from './viewModel'

function SitterProfile() {
  const {
    t,
    id,
    FormProvider,
    methods,
    selectedUnavailableDays,
    onDayClick,
    onSubmit,
    resetForm,
    aboutSitterRef,
    experienceRef,
    experienceData
  } = useCatSitter()

  const { handleSubmit } = methods;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <LinkButton to={`/profile/catsitter/${id}`} target="_blank">
          {t('sitter_form.view_profile')}
        </LinkButton>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HorizontalCard ref={aboutSitterRef}>
            <CardTitle>{t('sitter_form.about_me')}</CardTitle>

            <AboutMe t={t} />
          </HorizontalCard>

          <HorizontalCard ref={experienceRef}>
            <CardTitle>{t('sitter_form.experience_serivce')}</CardTitle>

            <Experience t={t} experienceData={experienceData} />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('sitter_form.pricing')}</CardTitle>

            <Pricing t={t} />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('sitter_form.availability')}</CardTitle>

            <Availability
              t={t}
              selectedUnavailableDays={selectedUnavailableDays}
              onDayClick={onDayClick}
            />
          </HorizontalCard>

          <FormButtons onClick={resetForm} />
        </form>
      </FormProvider>
    </>
  );
}

export default SitterProfile;


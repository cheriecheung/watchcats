import React, { useEffect, useRef } from 'react';
import { FormButtons } from '../../../components/FormComponents';
import { CardTitle, HorizontalCard, TextButton } from '../../../components/UIComponents'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'react-day-picker/lib/style.css';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cat_sitter_schema } from '../_validationSchema';
import { cat_sitter_default_values as defaultValues } from '../_defaultValues'

import AboutMe from './AboutMe';
import Experience from './Experience';
import Pricing from './Pricing';
import Availability from './Availability';

import { useCatSitter } from './viewModel'

const resolver = yupResolver(cat_sitter_schema)

function SitterProfile() {
  const aboutSitterRef = useRef(null);
  const experienceRef = useRef(null);

  const { t } = useTranslation();
  const { id } = useParams();

  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit, watch, reset, errors } = methods;

  const { cleanedData, onSubmit } = useCatSitter()

  useEffect(() => {
    if (cleanedData) {
      reset(cleanedData)
    }
  }, [cleanedData])

  useEffect(() => {
    const errorsArr = Object.keys(errors);

    if (errorsArr.length > 0) {
      if (errorsArr[0] === 'aboutSitter') {
        window.scrollTo(0, aboutSitterRef.current.offsetTop - 20);
      }
      if (errorsArr[0] === 'experience') {
        window.scrollTo(0, experienceRef.current.offsetTop - 20);
      }
    }
  }, [errors])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <TextButton variant="link" link={`/profile/catsitter/${id}`}>
          {t('sitter_form.view_profile')}
        </TextButton>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HorizontalCard ref={aboutSitterRef}>
            <CardTitle>{t('sitter_form.about_me')}</CardTitle>

            <AboutMe />
          </HorizontalCard>

          <HorizontalCard ref={experienceRef}>
            <CardTitle>{t('sitter_form.experience_serivce')}</CardTitle>

            <Experience />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('sitter_form.pricing')}</CardTitle>

            <Pricing />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('sitter_form.availability')}</CardTitle>

            <Availability reset={reset} watch={watch} />
          </HorizontalCard>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default SitterProfile;

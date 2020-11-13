import React, { useEffect } from 'react';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cat_owner_schema } from '../_validationSchema';
import { cat_owner_default_values as defaultValues } from '../_defaultValues'

import AboutMe from './AboutMe';
import AppointmentTime from './AppointmentTime';
import AboutCat from './AboutCat';
import Responsibilities from './Responsibilities';

import { useCatOwner, useCat } from './viewModel'

const resolver = yupResolver(cat_owner_schema)

const CatInfoContainer = styled.div`
  text-align: left;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
`;

function CatOwnerInfo() {
  const { t } = useTranslation();
  const { id } = useParams();

  const methods = useForm({ defaultValues, resolver });
  const { register, control, handleSubmit, reset, watch, errors, setValue } = methods;

  const oneDayFieldArray = useFieldArray({ control, name: 'bookingOneDay' });
  const overnightFieldArray = useFieldArray({ control, name: 'bookingOvernight' });
  const catFieldArray = useFieldArray({ control, name: 'cat' });

  const { cleanedData, onSubmit } = useCatOwner();
  const catProps = useCat();

  useEffect(() => {
    if (cleanedData) {
      reset(cleanedData)
    }
  }, [cleanedData])

  const submitData = (data) => {
    const photos = watch('cat').map(({ photo }) => photo || {})

    onSubmit(data, photos)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <a href={`/profile/catowner/${id}`} target="_blank">
          {t('owner_form.view_profile')}
        </a>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitData)}>
          <SectionContainer>
            <SectionTitle> {t('owner_form.about_me')}</SectionTitle>

            <AboutMe />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('owner_form.appointment')}</SectionTitle>

            <h6 style={{ marginTop: 30 }}>{t('owner_form.one_day')}</h6>
            <AppointmentTime
              watch={watch}
              oneDayFieldArray={oneDayFieldArray}
              overnightFieldArray={overnightFieldArray}
            />
          </SectionContainer>

          <CatInfoContainer>
            <SectionTitle>{t('owner_form.about_cat')}</SectionTitle>
            <AboutCat
              setValue={setValue}
              watch={watch}
              catFieldArray={catFieldArray}
              catProps={catProps}
            />
          </CatInfoContainer>

          <SectionContainer>
            <SectionTitle>{t('owner_form.cat_description')}</SectionTitle>

            <Responsibilities />
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default CatOwnerInfo;
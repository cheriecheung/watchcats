import React, { useEffect } from 'react';
import { FormButtons } from '../../../components/FormComponents';
import { CardTitle, HorizontalCard } from '../../../components/UIComponents'
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
          <HorizontalCard>
            <CardTitle> {t('owner_form.about_me')}</CardTitle>

            <AboutMe />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('owner_form.appointment')}</CardTitle>

            <h6 style={{ marginTop: 30 }}>{t('owner_form.one_day')}</h6>
            <AppointmentTime
              watch={watch}
              oneDayFieldArray={oneDayFieldArray}
              overnightFieldArray={overnightFieldArray}
            />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('owner_form.about_cat')}</CardTitle>
            <AboutCat
              setValue={setValue}
              watch={watch}
              catFieldArray={catFieldArray}
              catProps={catProps}
            />
          </HorizontalCard>

          <HorizontalCard>
            <CardTitle>{t('owner_form.cat_description')}</CardTitle>

            <Responsibilities />
          </HorizontalCard>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default CatOwnerInfo;
import React, { useEffect, useRef } from 'react';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import { getSitterAccount, saveSitter } from '../../../redux/actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cat_sitter_schema } from '../_validationSchema';
import { cat_sitter_default_values as defaultValues } from '../_defaultValues'

import AboutMe from './AboutMe';
import Experience from './Experience';
import Pricing from './Pricing';
import Availability from './Availability';

const resolver = yupResolver(cat_sitter_schema)

function SitterProfile({ activeKey }) {
  const aboutSitterRef = useRef(null);
  const experienceRef = useRef(null);

  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const methods = useForm({ defaultValues, resolver });
  const { register, handleSubmit, watch, reset, errors } = methods;

  useEffect(() => {
    if (activeKey === 'sitter' && id) {
      dispatch(getSitterAccount(id));
    }
  }, [activeKey, dispatch]);

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

  const { sitterData } = useSelector((state) => state.account);

  useEffect(() => {
    if (sitterData) {
      const {
        hourlyRate,
        nightlyRate,
        unavailableDates = [],
        ...rest
      } = sitterData;

      const formData = { ...rest }

      if (hourlyRate) {
        const hourlyRateOption = { value: hourlyRate, label: `€ ${hourlyRate},00` };
        formData.hourlyRate = hourlyRateOption;
      }

      if (nightlyRate) {
        const nightlyRateOption = { value: nightlyRate, label: `€ ${nightlyRate},00` };
        formData.nightlyRate = nightlyRateOption;
      }

      if (unavailableDates.length > 0) {
        const formattedDates = unavailableDates.map((item) => new Date(item));
        formData.unavailableDates = formattedDates;
      }

      reset(formData);
    }
  }, [reset, sitterData]);

  const onSubmit = (data) => {
    const { hourlyRate, nightlyRate, unavailableDates, ...rest } = data;
    const { value: hourlyRateValue } = hourlyRate || {};
    const { value: nightlyRateValue } = nightlyRate || {};

    const parsedDates = unavailableDates.map((date) => {
      const parsed = moment(date).format('YYYY-MM-DD');
      return parsed;
    });

    const cleanedData = {
      hourlyRate: parseInt(hourlyRateValue),
      nightlyRate: parseInt(nightlyRateValue),
      unavailableDates: parsedDates,
      ...rest,
    };

    dispatch(saveSitter(id, cleanedData));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <a href={`/profile/catsitter/${id}`} target="_blank">
          {t('sitter_form.view_profile')}
        </a>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionContainer ref={aboutSitterRef}>
            <SectionTitle>{t('sitter_form.about_me')}</SectionTitle>

            <AboutMe />
          </SectionContainer>

          {/*  YEARS OF CAT CARE  */}

          <SectionContainer ref={experienceRef}>
            <SectionTitle>{t('sitter_form.experience_serivce')}</SectionTitle>

            <Experience />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('sitter_form.pricing')}</SectionTitle>

            <Pricing />
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('sitter_form.availability')}</SectionTitle>

            <Availability reset={reset} watch={watch} />
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default SitterProfile;

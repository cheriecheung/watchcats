import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import { priceOneDayOptions, priceOvernightOptions } from '../../../constants';
import { getSitterAccount, saveSitter } from '../../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

import AboutMe from './AboutMe';
import Experience from './Experience';
import Pricing from './Pricing';
import Availability from './Availability';

const defaultValues = {
  aboutSitter: '',
  //photos: [],
  experience: '',
  hasCat: false,
  hasMedicationSkills: false,
  hasInjectionSkills: false,
  hasCertification: false,
  hasGroomingSkills: false,
  priceOneDay: priceOneDayOptions[0],
  priceOvernight: priceOvernightOptions[0],
  unavailableDates: [],
  emergencyName: '',
  emergencyNumber: '',
};

function SitterProfile({ activeKey }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const methods = useForm();
  const { register, handleSubmit, watch, reset } = methods;

  useEffect(() => {
    if (activeKey === 'sitter' && id) {
      dispatch(getSitterAccount(id));
    }
  }, [activeKey, dispatch]);

  const { sitterData } = useSelector((state) => state.account);

  useEffect(() => {
    if (sitterData) {
      const {
        aboutSitter,
        experience,
        hasCat = false,
        hasVolunteered = false,
        hasMedicationSkills = false,
        hasInjectionSkills = false,
        hasCertification = false,
        hasGroomingSkills = false,
        priceOneDay,
        priceOvernight,
        unavailableDates = [],
      } = sitterData;

      reset({
        ...defaultValues,
        aboutSitter,
        experience,
        hasCat,
        hasVolunteered,
        hasMedicationSkills,
        hasInjectionSkills,
        hasCertification,
        hasGroomingSkills,
        priceOneDay: { value: priceOneDay, label: `€ ${priceOneDay},00` },
        priceOvernight: { value: priceOvernight, label: `€ ${priceOvernight},00` },
        unavailableDates: unavailableDates.map((item) => new Date(item)),
      });
    }
  }, [reset, sitterData]);

  const onSubmit = (data) => {
    const { priceOneDay, priceOvernight, unavailableDates, ...rest } = data;
    const { value: priceOneDayValue } = priceOneDay || {};
    const { value: priceOvernightValue } = priceOvernight || {};

    const parsedDates = unavailableDates.map((date) => {
      const parsed = moment(date).format('YYYY-MM-DD');

      return parsed;
    });

    const cleanedData = {
      priceOneDay: priceOneDayValue,
      priceOvernight: priceOvernightValue,
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
          <SectionContainer>
            <SectionTitle>{t('sitter_form.about_me')}</SectionTitle>

            <AboutMe />
          </SectionContainer>

          {/*  YEARS OF CAT CARE  */}

          <SectionContainer>
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

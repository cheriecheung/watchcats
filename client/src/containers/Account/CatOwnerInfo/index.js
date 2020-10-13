import React, { useEffect } from 'react';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import styled from 'styled-components';
import { getOwnerAccount, saveOwner, saveCatPhotos } from '../../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { catBreedOptions, personalityOptions } from '../../../constants';

import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cat_owner_schema } from '../_validationSchema';
import { cat_owner_default_values as defaultValues } from '../_defaultValues'

import AboutMe from './AboutMe';
import AppointmentTime from './AppointmentTime';
import AboutCat from './AboutCat';
import Responsibilities from './Responsibilities';

const resolver = yupResolver(cat_owner_schema)

const CatInfoContainer = styled.div`
  text-align: left;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
`;

function CatOwnerInfo({ activeKey }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const methods = useForm({ defaultValues, resolver });
  const { register, control, handleSubmit, reset, watch, errors, setValue } = methods;

  const oneDayFieldArray = useFieldArray({ control, name: 'bookingOneDay' });
  const overnightFieldArray = useFieldArray({ control, name: 'bookingOvernight' });
  const catFieldArray = useFieldArray({ control, name: 'cat' });

  const { ownerData, ownerSaved } = useSelector((state) => state.account);

  // useEffect(() => {
  //   console.log({ errors })
  // }, [errors])

  useEffect(() => {
    if (activeKey === 'owner' && id) {
      dispatch(getOwnerAccount(id));
    }
  }, [activeKey, dispatch]);

  useEffect(() => {
    if (ownerData) {
      console.log({ ownerData })
      const {
        aboutMe,
        bookingOneDay = [],
        bookingOvernight = [],
        cat,
        catsDescription,
      } = ownerData;

      const catUpdated = cat.map(({ breed, personality, ...rest }) => {
        const breedName = catBreedOptions.filter(({ value }) => value === breed)[0].label
        const personalityName = personalityOptions.filter(({ value }) => value === personality)[0].label

        return {
          breed: { value: breed, label: breedName },
          personality: { value: personality, label: personalityName },
          ...rest
        }
      })

      reset({
        ...defaultValues,
        aboutMe,
        bookingOneDay,
        bookingOvernight,
        cat: catUpdated,
        catsDescription,
      });
    }
  }, [ownerData, reset]);

  const onSubmit = (data) => {
    const { cat, ...rest } = data;

    const cleanedCat = cat.map(({ breed, personality, photo, ...restCat }) => {
      const { value: breedValue } = breed || {};
      const { value: personalityValue } = personality || {};

      return {
        breed: parseInt(breedValue),
        personality: parseInt(personalityValue),
        ...restCat
      }
    })

    const cleanedData = { cat: cleanedCat, ...rest }

    dispatch(saveOwner(id, cleanedData))
  };
  // const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (ownerSaved) {
      const cat = watch('cat');
      const formData = new FormData();

      cat.forEach(({ photo: { file } }, index) => {
        formData.append('catPhotos', file);

        if (cat.length === index + 1) {
          dispatch(saveCatPhotos(formData))
        }
      })
    }
  }, [ownerSaved])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <a href={`/profile/catowner/${id}`} target="_blank">
          {t('owner_form.view_profile')}
        </a>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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

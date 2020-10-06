import React, { useEffect } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { FormButtons, SectionContainer, SectionTitle } from '../../../components/FormComponents';
import styled from 'styled-components';
import { getOwnerAccount, saveOwner } from '../../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AboutMe from './AboutMe';
import AppointmentTime from './AppointmentTime';
import AboutCat from './AboutCat';
import Responsibilities from './Responsibilities';

const CatInfoContainer = styled.div`
  text-align: left;
  margin-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 1);
`;

const oneDayObj = {
  date: '',
  startTime: '',
  endTime: '',
};
const overnightObj = { startDate: '', endDate: '' };
const catObj = {
  name: '',
  age: '',
  gender: '',
  isVaccinated: '',
  isInsured: '',
  breed: '',
  medicalNeeds: '',
  persionality: '',
  favouriteTreat: '',
  pictures: [],
};

const defaultValues = {
  aboutMe: '',
  // photos: [],
  bookingOneDay: [oneDayObj],
  bookingOvernight: [overnightObj],
  cat: [catObj],
  catsDescription: '',
};

function CatOwnerInfo({ activeKey }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const methods = useForm({ defaultValues });
  const { register, control, handleSubmit, reset, watch } = methods;
  const { fields: oneDayFields, append: oneDayAppend, remove: oneDayRemove } = useFieldArray({
    control,
    name: 'bookingOneDay',
  });
  const {
    fields: overnightFields,
    append: overnightAppend,
    remove: overnightRemove,
  } = useFieldArray({
    control,
    name: 'bookingOvernight',
  });
  const { fields: catFields, append: catAppend, remove: catRemove } = useFieldArray({
    control,
    name: 'cat',
  });

  useEffect(() => {
    if (activeKey === 'owner' && id) {
      dispatch(getOwnerAccount(id));
    }
  }, [activeKey, dispatch]);

  const { ownerData } = useSelector((state) => state.account);

  useEffect(() => {
    if (ownerData) {
      const {
        aboutMe,
        bookingOneDay = [oneDayObj],
        bookingOvernight = [overnightObj],
        cat = [catObj],
        catsDescription,
      } = ownerData;

      reset({
        ...defaultValues,
        aboutMe,
        bookingOneDay,
        bookingOvernight,
        cat,
        catsDescription,
      });
    }
  }, [ownerData, reset]);

  const onSubmit = (data) => dispatch(saveOwner(id, data));
  // const onSubmit = (data) => console.log(data);

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
              oneDayObj={oneDayObj}
              overnightObj={overnightObj}
              oneDayFieldArray={{ oneDayFields, oneDayRemove, oneDayAppend }}
              overnightFieldArray={{ overnightFields, overnightRemove, overnightAppend }}
            />
          </SectionContainer>

          <CatInfoContainer>
            <SectionTitle>{t('owner_form.about_cat')}</SectionTitle>
            <AboutCat
              watch={watch}
              catObj={catObj}
              catFieldArray={{ catFields, catAppend, catRemove }}
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

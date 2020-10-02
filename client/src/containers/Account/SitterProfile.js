import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col, Label, Input } from 'reactstrap';
import moment from 'moment';
import { DateUtils } from 'react-day-picker';
import {
  Calendar,
  Checkbox,
  FieldLabel,
  FormButtons,
  SectionContainer,
  SectionTitle,
  SelectField,
  TextArea,
  TextField,
} from '../../components/FormComponents';
import { priceOneDayOptions, priceOvernightOptions } from '../../constants';
import { getSitterAccount, saveSitter } from '../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import 'react-day-picker/lib/style.css';

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
  const selectedDays = watch('unavailableDates') || [];

  const handleDayClick = (day, { selected }) => {
    const allDays = [...selectedDays];
    if (selected) {
      const selectedIndex = allDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      allDays.splice(selectedIndex, 1);
    } else {
      allDays.push(day);
    }
    reset({ unavailableDates: allDays });
  };

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
    const { priceOneDay, priceOvernight } = data;
    const { value: priceOneDayValue } = priceOneDay || {};
    const { value: priceOvernightValue } = priceOvernight || {};

    const cleanedData = {
      ...data,
      priceOneDay: priceOneDayValue,
      priceOvernight: priceOvernightValue,
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

            <Row>
              <Col md={6}>
                <TextArea name="aboutSitter" placeholder={t('sitter_form.about_me_description')} />
              </Col>
              <Col md={6}>
                <p>
                  To let cat owners get an idea of who's sitting their cats, you can upload pictures
                  of yourself.
                </p>
                {/* <Controller
                  name="photos"
                  as={
                    <Input
                      type="file"
                      style={{
                        border: '1px solid #ced4da',
                        padding: 5,
                        borderRadius: '4px',
                        marginBottom: 10,
                      }}
                    />
                  }
                  control={control}
                /> */}
              </Col>
            </Row>
          </SectionContainer>

          {/*  YEARS OF CAT CARE  */}

          <SectionContainer>
            <SectionTitle>{t('sitter_form.experience_serivce')}</SectionTitle>
            <p style={{ margin: '20px 0 30px 0' }}>{t('sitter_form.experience_description')}</p>
            {/* <Row> */}
            <div className="sitter-skills">
              <Checkbox name="hasCat">
                <span>{t('sitter_form.has_cat')}</span>
              </Checkbox>
              <Checkbox name="hasVolunteered">
                <span>{t('sitter_form.volunteer')}</span>
              </Checkbox>
              <Checkbox name="hasMedicationSkills">
                <span>{t('sitter_form.medication')}</span>
              </Checkbox>
              <Checkbox name="hasInjectionSkills">
                <span>{t('sitter_form.injection')}</span>
              </Checkbox>
              <Checkbox name="hasCertification">
                <span>{t('sitter_form.certificate')}</span>
              </Checkbox>
              <Checkbox name="hasGroomingSkills">
                <span>{t('sitter_form.grooming')}</span>
              </Checkbox>
            </div>

            {/* <Col md={12}>  */}
            <TextArea
              name="experience"
              placeholder="Tell cat owners about your service. What type of services can you offer as a cat sitter? Why should a cat sitter invite you to take care of their cats?"
            />
            {/* </Col> */}
            {/* </Row> */}
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('sitter_form.pricing')}</SectionTitle>
            <Row>
              <Col md={6}>
                <FieldLabel>{t('sitter_form.one_day')}</FieldLabel>
                <SelectField name="priceOneDay" options={priceOneDayOptions} />
                <span>{t('sitter_form.per_hour')}</span>
              </Col>
              <Col md={6}>
                <FieldLabel>{t('sitter_form.overnight')}</FieldLabel>
                <SelectField name="priceOvernight" options={priceOvernightOptions} />
                <span>{t('sitter_form.per_night')}</span>
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t('sitter_form.availability')}</SectionTitle>
            <Row>
              <Col md={12}>
                <p>{t('sitter_form.availability_description')}</p>
              </Col>
              <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Calendar
                  name="unavailableDates"
                  selectedDays={selectedDays}
                  handleDayClick={handleDayClick}
                />
              </Col>
              <Col
                md={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 15,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <div className="calendar-available-date-box" />
                  <span>{t('sitter_form.available')}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 50,
                  }}
                >
                  <div className="calendar-unavailable-date-box" />
                  <span>{t('sitter_form.unavailable')}</span>
                </div>
              </Col>
            </Row>
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default SitterProfile;

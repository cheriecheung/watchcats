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
  SelectField,
  TextArea,
  TextField,
} from '../../components/FormComponents';
import { themeColor } from '../../style/theme';
import { priceOneDayOptions, priceOvernightOptions } from '../../constants';
import { getSitter, saveSitter } from '../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';

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
  priceOneTime: { value: '', label: '' },
  priceOvernight: { value: '', label: '' },
  unavailableDates: [],
  emergencyName: '',
  emergencyNumber: '',
};

function SitterProfile() {
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
    dispatch(getSitter());
  }, [dispatch]);

  const { data: sitterData } = useSelector((state) => state.account);

  useEffect(() => {
    console.log({ sitterData });
    if (sitterData) {
      const {
        aboutSitter,
        experience,
        hasCat = false,
        hasMedicationSkills = false,
        hasInjectionSkills = false,
        hasCertification = false,
        hasGroomingSkills = false,
        priceOneTime = { value: '', label: '' },
        priceOvernight = { value: '', label: '' },
        unavailableDates = [],
        emergencyName,
        emergencyNumber,
      } = sitterData;

      reset({
        ...defaultValues,
        aboutSitter,
        experience,
        hasCat,
        hasMedicationSkills,
        hasInjectionSkills,
        hasCertification,
        hasGroomingSkills,
        priceOneTime,
        priceOvernight,
        unavailableDates: unavailableDates.map((item) => new Date(item)),
        emergencyName,
        emergencyNumber,
      });
    }
  }, [reset, sitterData]);

  const onSubmit = (data) => dispatch(saveSitter(data));
  // const onSubmit = (data) => console.log(data);

  const color = themeColor.grey;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>About me</h6>

            <Row>
              <Col md={6}>
                <TextArea
                  name="aboutSitter"
                  placeholder="Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?"
                />
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

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Experience and service</h6>
            <p style={{ margin: '20px 0 30px 0' }}>
              Please select relevant experience / skills you possess. For every item selected,
              please briefly explain the details in the text box below.
            </p>
            {/* <Row> */}
            <div className="sitter-skills">
              <Checkbox name="hasCat">
                <span>Owns / owned a cat</span>
              </Checkbox>
              <Checkbox name="hasVolunteered">
                <span>Has done volunteer work</span>
              </Checkbox>
              <Checkbox name="hasMedicationSkills">
                <span>Able to administer medication</span>
              </Checkbox>
              <Checkbox name="hasInjectionSkills">
                <span> Able do injections</span>
              </Checkbox>
              <Checkbox name="hasCertification">
                <span>Has pet sitting certification</span>
              </Checkbox>
              <Checkbox name="hasGroomingSkills">
                <span>Has pet grooming skills</span>
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
            <h6 style={{ color, fontWeight: 800 }}>Pricing</h6>
            <Row>
              <Col md={6}>
                <FieldLabel>One time visit</FieldLabel>
                <SelectField name="priceOneTime" options={priceOneDayOptions} />
              </Col>
              <Col md={6}>
                <FieldLabel>Overnight visit</FieldLabel>
                <SelectField name="priceOvernight" options={priceOvernightOptions} />
                <span>Per night</span>
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Availability</h6>
            <Row>
              <Col md={12}>
                <p>
                  Select the dates that you are not available, so that cat owners can send you
                  requests based on your availability.
                </p>
              </Col>
              <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Calendar
                  name="unavailableDates"
                  selectedDays={selectedDays}
                  handleDayClick={handleDayClick}
                />
                {/* <DayPicker
                  name="unavailableDates"
                  disabledDays={{ before: new Date() }}
                  selectedDays={selectedDays}
                  onDayClick={handleDayClick}
                /> */}
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
                  <span>Available</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: 50,
                  }}
                >
                  <div className="calendar-unavailable-date-box" />
                  <span>Unavailable</span>
                </div>
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Emergency Contact</h6>
            <p>In case of an emergency, cat owners can contact the following:</p>
            <Row>
              <Col md={6}>
                <FieldLabel>Full name</FieldLabel>
                <TextField name="emergencyName" />
              </Col>
              <Col md={6}>
                <FieldLabel>Contact number</FieldLabel>
                <TextField name="emergencyNumber" />
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

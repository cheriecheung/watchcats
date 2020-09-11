import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { Row, Col, Label, Input } from 'reactstrap';
import {
  CheckboxGroup,
  DatePicker,
  FieldLabel,
  FormButtons,
  RadioGroup,
  RadioButton,
  SectionContainer,
  SelectField,
  TextArea,
  TextField,
  TimePicker,
} from '../../components/FormComponents';
import { themeColor } from '../../style/theme';
import { catBreedOptions, personalityOptions, medicineOptions } from '../../constants';
import styled from 'styled-components';
import { getOwner, saveOwner } from '../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

function OwnerProfile() {
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

  const handleRemoveCat = (index) => {
    if (window.confirm('Click Ok to confirm to remove cat record')) {
      catRemove(index);
    }
  };

  useEffect(() => {
    dispatch(getOwner());
  }, [dispatch]);

  const { data: ownerData } = useSelector((state) => state.account);

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

  const onSubmit = (data) => dispatch(saveOwner(data));
  // const onSubmit = (data) => console.log(data);

  const color = '#252525';

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
            <h6 style={{ color, fontWeight: 800 }}> {t('owner_form.about_me')}</h6>

            <Row>
              <Col md={6}>
                <TextArea name="aboutMe" placeholder={t('owner_form.about_me_description')} />
              </Col>
              <Col md={6}>
                <p>
                  To let cat sitters get an idea of where they will be cat sitting, you can upload
                  pictures of your place.
                </p>
                <Input
                  type="file"
                  style={{
                    border: '1px solid #ced4da',
                    padding: 5,
                    borderRadius: '4px',
                    marginBottom: 10,
                  }}
                />
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>{t('owner_form.appointment')}</h6>

            <h6 style={{ marginTop: 30 }}>{t('owner_form.one_day')}</h6>

            {oneDayFields.map((item, index) => {
              return (
                <div key={item.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6 hidden={index === 0}>
                      {t('owner_form.one_day')} #{index + 1}
                    </h6>
                    <button
                      hidden={index === 0}
                      type="button"
                      onClick={() => oneDayRemove(index)}
                      style={{
                        alignSelf: 'flex-end',
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        float: 'right',
                        color: themeColor.peach,
                      }}
                    >
                      {t('owner_form.remove')}
                    </button>
                  </div>

                  <Row>
                    <Col md={6}>
                      <div className="d-flex flex-column date-picker">
                        <FieldLabel> {t('owner_form.date')}</FieldLabel>
                        <DatePicker name={`bookingOneDay[${index}].date`} />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div className="d-flex flex-column time-picker">
                          <FieldLabel> {t('owner_form.start_time')}</FieldLabel>
                          <TimePicker name={`bookingOneDay[${index}].startTime`} />
                        </div>
                        <i className="fas fa-arrow-right align-self-center mt-4" />
                        <div className="d-flex flex-column time-picker">
                          <FieldLabel> {t('owner_form.end_time')}</FieldLabel>
                          <TimePicker name={`bookingOneDay[${index}].endTime`} />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <hr hidden={watch('bookingOneDay').length === 1} style={{ margin: '30px 0' }} />
                </div>
              );
            })}
            <button
              hidden={watch('bookingOneDay').length >= 2}
              className="add-field-btn"
              onClick={() => oneDayAppend(oneDayObj)}
              style={{
                // background: '#ffecea',
                color: '#ffa195',
                outline: 'none',
                border: 'none',
                borderRadius: 15,
              }}
            >
              <i className="fas fa-plus mr-1" />
              {t('owner_form.add_period')}
            </button>
            <span hidden={watch('bookingOneDay').length < 2}>
              You can at most request 2 one-day appointments at the same time!
            </span>

            <h6 style={{ marginTop: 40 }}> {t('owner_form.overnight')}</h6>

            {overnightFields.map((item, index) => {
              return (
                <div key={item.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6 hidden={index === 0} style={{ color }}>
                      {t('owner_form.overnight')} visit #{index + 1}
                    </h6>
                    <button
                      hidden={index === 0}
                      type="button"
                      onClick={() => overnightRemove(index)}
                      style={{
                        alignSelf: 'flex-end',
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        float: 'right',
                        color: themeColor.peach,
                      }}
                    >
                      {t('owner_form.remove')}
                    </button>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                      <FieldLabel>{t('owner_form.start_date')}</FieldLabel>
                      <DatePicker name={`bookingOvernight[${index}].startDate`} />
                    </div>
                    <i className="fas fa-arrow-right align-self-center mt-4" />
                    <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                      <FieldLabel>{t('owner_form.end_date')}</FieldLabel>
                      <DatePicker name={`bookingOvernight[${index}].endDate`} />
                    </div>
                  </div>
                  <hr
                    hidden={watch('bookingOvernight').length === 1}
                    style={{ margin: '30px 0' }}
                  />
                </div>
              );
            })}

            <button
              hidden={watch('bookingOvernight').length >= 2}
              className="add-field-btn"
              onClick={() => overnightAppend(overnightObj)}
              style={{
                //  background: '#ffecea',
                color: '#ffa195',
                outline: 'none',
                border: 'none',
                borderRadius: 15,
              }}
            >
              <i className="fas fa-plus mr-1" />
              {t('owner_form.add_period')}
            </button>
            <span hidden={watch('bookingOvernight').length < 2}>
              You can at most request 2 overnight sitting appointments at the same time!
            </span>
          </SectionContainer>

          <CatInfoContainer>
            <h6 style={{ color, fontWeight: 800, padding: 20 }}>{t('owner_form.about_cat')}</h6>

            {catFields.map((item, index) => {
              return (
                <div
                  key={item.id}
                  style={{
                    background: index % 2 !== 0 ? 'rgba(168, 165, 165, 0.05)' : 'none',
                    padding: '20px 20px 0 20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6 hidden={index === 0} style={{ color, fontWeight: 800 }}>
                      And my #{index + 1} cat
                    </h6>
                    <button
                      hidden={index === 0}
                      type="button"
                      onClick={() => handleRemoveCat(index)}
                      style={{
                        marginBottom: 10,
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        float: 'right',
                        color: '#ffa195',
                      }}
                    >
                      {t('owner_form.remove')}
                    </button>
                  </div>

                  <Row>
                    <Col md={6} className="mb-4">
                      <FieldLabel>{t('owner_form.name')}</FieldLabel>
                      <TextField name={`cat[${index}].name`} />
                    </Col>
                    <Col md={6} className="mb-4" style={{ marginBottom: 30 }}>
                      <FieldLabel>{t('owner_form.age')}</FieldLabel>
                      <TextField name={`cat[${index}].age`} />
                    </Col>

                    <Col md={6} className="mb-4">
                      <FieldLabel>{t('owner_form.gender')}</FieldLabel>
                      <br />
                      <RadioGroup name={`cat[${index}].gender`}>
                        <RadioButton value="M">
                          <i className="fas fa-mars fa-2x icon-gender" />
                          <span>{t('owner_form.male')}</span>
                        </RadioButton>
                        <RadioButton value="F">
                          <i className="fas fa-venus fa-2x icon-gender" />
                          <span>{t('owner_form.female')}</span>
                        </RadioButton>
                      </RadioGroup>
                    </Col>
                    <Col md={6} className="mb-4">
                      <FieldLabel>{t('owner_form.medical_needs')}</FieldLabel>
                      <br />
                      <CheckboxGroup
                        name={`cat[${index}].medicalNeeds`}
                        options={medicineOptions}
                      />
                    </Col>

                    <Col md={6} className="mb-4">
                      <FieldLabel>{t('owner_form.vaccinated')}</FieldLabel>
                      <br />
                      <RadioGroup name={`cat[${index}].isVaccinated`}>
                        <RadioButton value={true}>
                          <i className="fas fa-check fa-2x icon-yes-no" />
                          <span>{t('owner_form.yes')}</span>
                        </RadioButton>
                        <RadioButton value={false}>
                          <i className="fas fa-times fa-2x icon-yes-no" />
                          <span>{t('owner_form.no')}</span>
                        </RadioButton>
                      </RadioGroup>
                    </Col>
                    <Col md={6} className="mb-4">
                      <FieldLabel>{t('owner_form.insured')}</FieldLabel>
                      <br />
                      <RadioGroup name={`cat[${index}].isInsured`}>
                        <RadioButton value={true}>
                          <i className="fas fa-check fa-2x icon-yes-no" />
                          <span>{t('owner_form.yes')}</span>
                        </RadioButton>
                        <RadioButton value={false}>
                          <i className="fas fa-times fa-2x icon-yes-no" />
                          <span>{t('owner_form.no')}</span>
                        </RadioButton>
                      </RadioGroup>
                    </Col>

                    <Col md={6} className="mb-4">
                      <FieldLabel>{t('owner_form.breed')}</FieldLabel>
                      <SelectField name={`cat[${index}].breed`} options={catBreedOptions} />
                    </Col>
                    <Col md={6} className="mb-4">
                      <FieldLabel>Personality that fits your cat the best</FieldLabel>
                      <SelectField
                        name={`cat[${index}].personality`}
                        options={personalityOptions}
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <FieldLabel>{t('owner_form.favourite_treat')}</FieldLabel>
                      <TextField name={`cat[${index}].favouriteTreat`} />
                    </Col>
                    <Col md={6} className="mb-3">
                      <FieldLabel>{t('owner_form.pictures')} (max. 3)</FieldLabel>
                      <br />
                      <label for="file-upload" className="upload-file-input form-control">
                        <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
                        <span>{t('owner_form.upload')}</span>
                      </label>
                      <input id="file-upload" type="file" />
                    </Col>
                  </Row>

                  <hr hidden={watch('cat').length === 1} style={{ margin: '20px 0 0 0' }} />
                </div>
              );
            })}

            <button
              hidden={watch('cat').length > 4}
              className="add-field-btn"
              onClick={() => catAppend(catObj)}
              style={{
                // background: '#ffecea',
                color: '#ffa195',
                outline: 'none',
                border: 'none',
                borderRadius: 15,
                padding: 20,
              }}
            >
              <i className="fas fa-plus mr-1" />
              {t('owner_form.add_cat')}
            </button>

            <span hidden={watch('cat').length <= 4}>
              If you have 5 or more cats, perhaps you would want to consider having them stay at a
              pet hotel, so they can all be taken care of by full time staff!
            </span>
          </CatInfoContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>{t('owner_form.cat_description')}</h6>
            <TextArea
              name="catsDescription"
              placeholder={t('owner_form.cat_description_text')}
              rows="5"
            />
          </SectionContainer>

          <FormButtons onClick={() => reset(defaultValues)} />
        </form>
      </FormProvider>
    </>
  );
}

export default OwnerProfile;

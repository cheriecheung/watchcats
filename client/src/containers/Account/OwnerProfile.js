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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionContainer>
          <h6 style={{ color, fontWeight: 800 }}>About me and my house</h6>

          <Row>
            <Col md={6}>
              <TextArea
                name="aboutMe"
                placeholder="Tell cat sitters about yourself. Start with a little description of yourself and your house - which neighbourhood do you live in? Why are you looking for a cat sitter?"
              />
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
          <h6 style={{ color, fontWeight: 800 }}>Cat sitting appointment</h6>

          <h6 style={{ marginTop: 30 }}>One day visit</h6>

          {oneDayFields.map((item, index) => {
            return (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h6 hidden={index === 0}>One day visit #{index + 1}</h6>
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
                    Remove
                  </button>
                </div>

                <Row>
                  <Col md={6}>
                    <div className="d-flex flex-column date-picker">
                      <FieldLabel>Date</FieldLabel>
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
                        <FieldLabel>Start time</FieldLabel>
                        <TimePicker name={`bookingOneDay[${index}].startTime`} />
                      </div>
                      <i className="fas fa-arrow-right align-self-center mt-4" />
                      <div className="d-flex flex-column time-picker">
                        <FieldLabel>End time</FieldLabel>
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
            Add another time
          </button>
          <span hidden={watch('bookingOneDay').length < 2}>
            You can at most request 2 one-day appointments at the same time!
          </span>

          <h6 style={{ marginTop: 40 }}>Overnight visit</h6>

          {overnightFields.map((item, index) => {
            return (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h6 hidden={index === 0} style={{ color }}>
                    Overnight visit #{index + 1}
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
                    Remove
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                    <FieldLabel>Start date </FieldLabel>
                    <DatePicker name={`bookingOvernight[${index}].startDate`} />
                  </div>
                  <i className="fas fa-arrow-right align-self-center mt-4" />
                  <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                    <FieldLabel>End date</FieldLabel>
                    <DatePicker name={`bookingOvernight[${index}].endDate`} />
                  </div>
                </div>
                <hr hidden={watch('bookingOvernight').length === 1} style={{ margin: '30px 0' }} />
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
            Add another time
          </button>
          <span hidden={watch('bookingOvernight').length < 2}>
            You can at most request 2 overnight sitting appointments at the same time!
          </span>
        </SectionContainer>

        <CatInfoContainer>
          <h6 style={{ color, fontWeight: 800, padding: 20 }}>About my cat</h6>

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
                    Remove cat
                  </button>
                </div>

                <Row>
                  <Col md={6} className="mb-4">
                    <FieldLabel>Name</FieldLabel>
                    <TextField name={`cat[${index}].name`} />
                  </Col>

                  <Col md={6} className="mb-4">
                    <FieldLabel>Age</FieldLabel>
                    <TextField name={`cat[${index}].age`} />
                  </Col>
                  <Col md={6} className="mb-4">
                    <FieldLabel>Gender</FieldLabel>
                    <br />
                    <RadioGroup name={`cat[${index}].gender`}>
                      <RadioButton value="M">
                        <i className="fas fa-mars fa-2x icon-gender" />
                        <span>Male</span>
                      </RadioButton>
                      <RadioButton value="F">
                        <i className="fas fa-venus fa-2x icon-gender" />
                        <span>Female</span>
                      </RadioButton>
                    </RadioGroup>
                  </Col>
                  <Col md={6} className="mb-4">
                    <FieldLabel>Medical needs</FieldLabel>
                    <br />
                    <CheckboxGroup name={`cat[${index}].medicalNeeds`} options={medicineOptions} />
                  </Col>
                  <Col md={6} className="mb-4">
                    <FieldLabel>Vaccinated</FieldLabel>
                    <br />
                    <RadioGroup name={`cat[${index}].isVaccinated`}>
                      <RadioButton value={true}>
                        <i className="fas fa-check fa-2x icon-yes-no" />
                        <span>Yes</span>
                      </RadioButton>
                      <RadioButton value={false}>
                        <i className="fas fa-times fa-2x icon-yes-no" />
                        <span>No</span>
                      </RadioButton>
                    </RadioGroup>
                  </Col>
                  <Col md={6} className="mb-4">
                    <FieldLabel>Insured</FieldLabel>
                    <br />
                    <RadioGroup name={`cat[${index}].isInsured`}>
                      <RadioButton value={true}>
                        <i className="fas fa-check fa-2x icon-yes-no" />
                        <span>Yes</span>
                      </RadioButton>
                      <RadioButton value={false}>
                        <i className="fas fa-times fa-2x icon-yes-no" />
                        <span>No</span>
                      </RadioButton>
                    </RadioGroup>
                  </Col>
                  <Col md={6} className="mb-4">
                    <FieldLabel>Breed</FieldLabel>
                    <SelectField name={`cat[${index}].breed`} options={catBreedOptions} />
                  </Col>
                  <Col md={6} className="mb-4">
                    <FieldLabel>Personality that fits your cat the best</FieldLabel>
                    <SelectField name={`cat[${index}].personality`} options={personalityOptions} />
                  </Col>
                  <Col md={6} className="mb-3">
                    <FieldLabel>Favorite treat</FieldLabel>
                    <TextField name={`cat[${index}].favouriteTreat`} />
                  </Col>
                  <Col md={6} className="mb-3">
                    <FieldLabel>Pictures of your cat (max. 3)</FieldLabel>
                    <br />
                    <label for="file-upload" className="upload-file-input form-control">
                      <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
                      <span>Upload</span>
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
            Add another cat
          </button>

          <span hidden={watch('cat').length <= 4}>
            If you have 5 or more cats, perhaps you would want to consider having them stay at a pet
            hotel, so they can all be taken care of by full time staff!
          </span>
        </CatInfoContainer>

        <SectionContainer>
          <h6 style={{ color, fontWeight: 800 }}>Description of my cat(s)</h6>
          <TextArea
            name="catsDescription"
            placeholder="Please write a description about your cat(s) - include their feeing, litter, playtime routine, and other needs. It is also important to include your vets details should the cat sitter needs to get hold if them."
            rows="5"
          />
        </SectionContainer>

        <FormButtons onClick={() => reset(defaultValues)} />
      </form>
    </FormProvider>
  );
}

export default OwnerProfile;

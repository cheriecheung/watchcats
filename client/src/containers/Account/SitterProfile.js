import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col, Label, Input } from 'reactstrap';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import {
  Checkbox,
  FormButtons,
  SectionContainer,
  SelectField,
  TextArea,
  TextField,
} from '../../components/FormComponents';
import { themeColor } from '../../style/theme';
import { priceOneDayOptions } from '../../constants';

import 'react-day-picker/lib/style.css';

const defaultValues = {
  aboutMe: '',
  photos: [],
  experience: '',
  hasCat: false,
  hasMedicationSkills: false,
  hasInjectionSkills: false,
  hasCertification: false,
  hasGroomingSkills: false,
  priceOneTime: { value: '', label: '' },
  priceOvernight: { value: '', label: '' },
  availability: [],
  emergencyName: '',
  emergencyNumber: '',
};

function SitterProfile() {
  const methods = useForm();
  const { register, handleSubmit, reset } = methods;
  const [selectedDays, setSelectedDays] = useState([]);

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
    setSelectedDays(allDays);
  };

  const sendData = (data) => {
    console.log(data);
  };
  const color = themeColor.green;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendData)}>
          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>About me</h6>

            <Row>
              <Col md={6}>
                <TextArea
                  name="aboutMe"
                  placeholder="Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?"
                />
              </Col>
              <Col md={6}>
                <p>
                  To let cat owners get an idea of who's sitting their cats, you
                  can upload pictures of yourself.
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

            <Row>
              <Col md={6}>
                <TextArea
                  name="experience"
                  placeholder="Tell cat owners about your service. What type of services can you offer as a cat sitter? Why should a cat sitter invite you to take care of their cats?"
                />
              </Col>

              <Col Col md={6}>
                <Checkbox name="hasCat" className="checkboxyz">
                  <i class="fas fa-cat fa-lg mr-4" style={{ color }} />
                  <span>Owns / owned a cat</span>
                </Checkbox>
                <Checkbox name="hasMedicationSkills">
                  <i class="fas fa-pills fa-lg mr-4" style={{ color }} />
                  <span>Able to administer medication</span>
                </Checkbox>
                <Checkbox name="hasInjectionSkills">
                  <i class="fas fa-syringe fa-lg mr-4" style={{ color }} />
                  <span> Able do injections</span>
                </Checkbox>
                <Checkbox name="hasCertification">
                  <i class="fas fa-certificate fa-lg mr-4" style={{ color }} />
                  <span>Has pet sitting certification</span>
                </Checkbox>
                <Checkbox name="hasGroomingSkills">
                  <i class="fas fa-broom fa-lg mr-4" style={{ color }} />
                  <span style={{ flexBasis: '90%' }}>
                    Has pet grooming skills
                  </span>
                </Checkbox>
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Pricing</h6>
            <Row>
              <Col md={6}>
                <Label>One time visit</Label>
                <SelectField name="priceOneTime" options={priceOneDayOptions} />
              </Col>
              <Col md={6}>
                <Label>Overnight visit</Label>
                <Input type="text" />
                <span>Per night</span>
              </Col>
            </Row>
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Availability</h6>
            <DayPicker
              selectedDays={selectedDays}
              onDayClick={handleDayClick}
            />
          </SectionContainer>

          <SectionContainer>
            <h6 style={{ color, fontWeight: 800 }}>Emergency Contact</h6>
            <p>
              In case of an emergency, cat owners can contact the following:
            </p>
            <Row>
              <Col md={6}>
                <TextField name="emergencyName" title="Full name" />
              </Col>
              <Col md={6}>
                <TextField name="emergencyNumber" title="Mobile number" />
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

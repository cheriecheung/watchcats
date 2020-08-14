import React, { useState } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';
import { useForm, FormProvider } from 'react-hook-form';
import moment from 'moment';
import styled from 'styled-components';
import DayPicker, { DateUtils } from 'react-day-picker';
import {
  Checkbox,
  SelectField,
  TextArea,
  TextField,
} from '../../components/FormComponents';
import { themeColor } from '../../style/theme';

import 'react-day-picker/lib/style.css';

const Section = styled.div`
  text-align: left;
  margin-bottom: 40px;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 0px 54px -15px rgba(78, 118, 107, 0.5);
  background: #fff;
`;

function SitterProfile() {
  const methods = useForm();
  const { register, handleSubmit } = methods;
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
  const color = '#207367';

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(sendData)}>
          <Section>
            <h5 style={{ color, fontWeight: 800 }}>About me</h5>

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
          </Section>

          <Section>
            <h5 style={{ color, fontWeight: 800 }}>Experience</h5>

            <Row>
              <Col md={6}>
                <TextArea
                  name="experience"
                  placeholder="Tell cat owners about your service. What type of services can you offer as a cat sitter? Why should a cat sitter invite you to take care of their cats?"
                />
              </Col>

              <Col Col md={6}>
                <Checkbox name="hasCat">
                  <i class="fas fa-cat fa-2x mr-4" style={{ color }} />
                  <span>Owns / owned a cat</span>
                </Checkbox>
                <Checkbox name="hasMedicationSkills">
                  <i class="fas fa-pills fa-2x mr-4" style={{ color }} />
                  <span>Able to administer medication</span>
                </Checkbox>
                <Checkbox name="hasInjectionSkills">
                  <i class="fas fa-syringe fa-2x mr-4" style={{ color }} />
                  <span> Able do injections</span>
                </Checkbox>
                <Checkbox name="hasCertification">
                  <i class="fas fa-certificate fa-2x mr-4" style={{ color }} />
                  <span>Has pet sitting certification</span>
                </Checkbox>
                <Checkbox name="hasGroomingSkills">
                  <i class="fas fa-broom fa-2x mr-4" style={{ color }} />
                  <span style={{ flexBasis: '90%' }}>
                    Has pet grooming skills
                  </span>
                </Checkbox>
              </Col>
            </Row>
          </Section>

          <Section>
            <h5 style={{ color, fontWeight: 800 }}>Pricing</h5>
            <Row>
              <Col md={6}>
                <Label>One time visit</Label>
                <SelectField
                  name="priceOneTime"
                  options={[
                    { value: 6, label: 6 },
                    { value: 7, label: 7 },
                    { value: 8, label: 8 },
                    { value: 9, label: 9 },
                  ]}
                />
              </Col>
              <Col md={6}>
                <Label>Overnight visit</Label>
                <Input type="text" />
                <span>Per night</span>
              </Col>
            </Row>
          </Section>

          <Section>
            <h5 style={{ color, fontWeight: 800 }}>Availability</h5>
            <DayPicker
              selectedDays={selectedDays}
              onDayClick={handleDayClick}
            />
          </Section>

          <Section>
            <h5 style={{ color, fontWeight: 800 }}>Emergency Contact</h5>
            <p>
              In case of an emergency, cat owners can contact the following:
            </p>
            <Row>
              <Col md={6} className="mb-3">
                <TextField name="emergencyName" title="Full name" />
              </Col>
              <Col md={6} className="mb-3">
                <TextField name="emergencyNumber" title="Mobile number" />
              </Col>
            </Row>
          </Section>

          <input type="submit" style={{ float: 'right' }} />

          {/* <div className="float-right mb-5">
        <Button variant="outline-danger" size="sm" className="mr-3">
          Reset
        </Button>
        <Button variant="outline-primary" size="sm">
          Save
        </Button>
      </div> */}
        </form>
      </FormProvider>
    </>
  );
}

export default SitterProfile;

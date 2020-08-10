import React, { useState } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';
import { Calendar } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const Section = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

// function disabledDate(current) {
//   return current < moment().endOf('day');
// }

function SitterProfile() {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayClick = (day, { selected }) => {
    const updateSelectedDays = [...selectedDays];
    if (selected) {
      const selectedIndex = updateSelectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      updateSelectedDays.splice(selectedIndex, 1);
    } else {
      updateSelectedDays.push(day);
    }
    setSelectedDays(updateSelectedDays);
  };

  return (
    <>
      <Section>
        <h5>About me</h5>

        <Row>
          <Col md={6}>
            <Input
              type="textarea"
              placeholder="Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?"
              rows="10"
              style={{ resize: 'none' }}
            />
          </Col>
          <Col md={6}>
            <p>
              To let cat owners get an idea of who's sitting their cats, you can
              upload pictures of yourself.
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
      </Section>

      <Section>
        <h5>Experience</h5>

        <Row>
          <Col md={6}>
            <Input
              type="textarea"
              placeholder="Tell cat owners about your service. What type of services can you offer as a cat sitter? Why should a cat sitter invite you to take care of their cats?"
              rows="10"
              style={{ resize: 'none', marginBottom: 20 }}
            />
          </Col>

          <Col Col md={6}>
            <label className="d-flex mb-4">
              <i class="fas fa-cat fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}>Owns / owned a cat</span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-pills fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}>
                Able to administer medication
              </span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-syringe fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}> Able do injections</span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-certificate fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}>
                Has pet sitting certification
              </span>
              <input type="checkbox" />
            </label>
            <label className="d-flex mb-4">
              <i class="fas fa-broom fa-2x mr-4" />
              <span style={{ flexBasis: '90%' }}> Has pet grooming skills</span>
              <input type="checkbox" />
            </label>
          </Col>
        </Row>
      </Section>

      <Section>
        <h5>Pricing</h5>
        <Row>
          <Col md={6}>
            <Label>One time visit</Label>
            <Input
              type="text"
              //value={details.newLpn}
              //onChange={handleInput}
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
        <h5>Availability</h5>
        <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
        {/* <Calendar
          style={{ width: '35vw' }}
          disabledDate={disabledDate}
          defaultValue={moment(new Date())}
          onSelect={(date) => console.log({ date })}
          onChange={(date) => console.log({ date })}
          showToday={true}
        /> */}
      </Section>

      <Section>
        <h5>Emergency Contact</h5>
        <p>In case of an emergency, cat owners can contact the following:</p>
        <Row>
          <Col md={6} className="mb-3">
            <Label>Full name</Label>
            <Input type="text" />
          </Col>
          <Col md={6} className="mb-3">
            <Label>Mobile number</Label>
            <Input type="text" />
          </Col>
        </Row>
      </Section>
    </>
  );
}

export default SitterProfile;

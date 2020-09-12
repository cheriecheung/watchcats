import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { calculateOneDayPrice, calculateOvernightPrice } from '../../../utility';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function SelectAppointmentTime({ t, appointmentTime, oneDayPrice, overnightPrice }) {
  const { allOneDays = [], allOvernight = [] } = appointmentTime;
  const [price, setPrice] = useState('To be calculated');

  const handleSelectTime = (e) => {
    const [type, index] = e.target.value.split('.');

    if (type === 'oneDay') {
      const startTime = allOneDays[index].startTime;
      const endTime = allOneDays[index].endTime;

      const value = calculateOneDayPrice(startTime, endTime, oneDayPrice);
      setPrice(value);
    }

    if (type === 'overnight') {
      const startDate = allOvernight[index].startDate;
      const endDate = allOvernight[index].endDate;

      const value = calculateOvernightPrice(startDate, endDate, overnightPrice);
      setPrice(value);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <b style={{ fontSize: '1.1rem', flexBasis: '25%' }}>Select a time</b>
      <p>
        The following is/are the appointment time you previously filled out in your cat owner
        profile.
      </p>

      {allOneDays.length > 0 && (
        <Row style={{ marginTop: 25 }}>
          <Col md={4} style={{ marginBottom: 15 }}>
            <b>One day appointment:</b>
          </Col>
          <Col md={8}>
            {allOneDays.map(({ id, date, startTime, endTime }, index) => {
              const dateConverted = moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');

              return (
                <div key={id} style={{ marginBottom: 5 }}>
                  <label>
                    <input
                      type="radio"
                      name="appointmentTime"
                      value={`oneDay.${index}`}
                      style={{ marginRight: 10 }}
                      onClick={handleSelectTime}
                    />
                    {dateConverted}, {startTime} - {endTime}
                  </label>
                </div>
              );
            })}
          </Col>
        </Row>
      )}

      {[allOvernight].length > 0 && (
        <Row style={{ marginTop: 15 }}>
          <Col md={4} style={{ marginBottom: 15 }}>
            <b>Overnight appointment:</b>
          </Col>
          <Col md={8}>
            {allOvernight.map(({ id, startDate, endDate }, index) => {
              const startDateConverted = moment(startDate, 'YYYY-MM-DD').format('DD MMM YYYY');
              const endDateConverted = moment(endDate, 'YYYY-MM-DD').format('DD MMM YYYY');

              return (
                <div key={id} style={{ marginBottom: 5 }}>
                  <label>
                    <input
                      type="radio"
                      name="appointmentTime"
                      value={`overnight.${index}`}
                      style={{ marginRight: 10 }}
                      onClick={handleSelectTime}
                    />
                    {startDateConverted} - {endDateConverted}
                  </label>
                </div>
              );
            })}
          </Col>
        </Row>
      )}

      <hr />

      <Row style={{ marginTop: 10 }}>
        <Col md={4} style={{ marginBottom: 15 }}>
          <b style={{ fontSize: '0.9rem', flexBasis: '25%' }}>
            {t('sitter_profile.appointment_fee')}:
          </b>
        </Col>
        <Col md={8}>
          <h6>{price}</h6>
        </Col>
      </Row>
    </div>
  );
}

export default SelectAppointmentTime;

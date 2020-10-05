import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import { calculateOneDayPrice, calculateOvernightPrice } from '../../../../utility';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function SelectAppointmentTime({
  t,
  appointmentTime,
  oneDayPrice,
  overnightPrice,
  setAppointmentData,
}) {
  const { allOneDays = [], allOvernight = [] } = appointmentTime;
  const [price, setPrice] = useState('To be calculated');

  const handleSelectTime = (e) => {
    const [type, index] = e.target.value.split('.');

    if (type === 'oneDay') {
      const date = allOneDays[index].date;
      const startTime = allOneDays[index].startTime;
      const endTime = allOneDays[index].endTime;

      const priceValue = calculateOneDayPrice(startTime, endTime, oneDayPrice);
      if (typeof priceValue === 'number') {
        setPrice(`€ ${priceValue}, 00`);
      } else {
        setPrice(priceValue);
      }

      setAppointmentData({ type, date, startTime, endTime, price: priceValue });
    }

    if (type === 'overnight') {
      const startDate = allOvernight[index].startDate;
      const endDate = allOvernight[index].endDate;

      const priceValue = calculateOvernightPrice(startDate, endDate, overnightPrice);
      if (typeof priceValue === 'number') {
        setPrice(`€ ${priceValue}, 00`);
      } else {
        setPrice(priceValue);
      }

      setAppointmentData({ type, startDate, endDate, price: priceValue });
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
              //const dateConverted = moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');
              //const startTimeObj = moment(new Date(startTime)).format('HH:mm');
              const dateConverted = moment(date).format('DD MMM YYYY');
              const startTimeObj = moment(startTime).format('HH:mm');
              const endTimeObj = moment(endTime).format('HH:mm');

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
                    {dateConverted}, {startTimeObj} - {endTimeObj}
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

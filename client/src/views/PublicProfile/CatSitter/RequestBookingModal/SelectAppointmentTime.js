import React from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import {
  ContainedButton,
  ErrorAlert,
  Spinner,
  TextButton
} from '../../../../components/UIComponents'
import { useSelectAppointmentTime } from '../../viewModel'

function SelectAppointmentTime({ t, closeModal }) {
  const {
    allOneDays,
    allOvernight,
    handleSelectTime,
    price,
    onSendRequest,
    bookingsError,
    isLoadingSendRequest
  } = useSelectAppointmentTime();

  return (
    <div style={{ textAlign: 'left' }}>
      <b style={{ fontSize: '1.1rem', flexBasis: '25%', fontWeight: 600 }}>
        {t('sitter_profile.select_time')}
      </b>
      <p>{t('sitter_profile.existing_time')}</p>

      {allOneDays.length > 0 && (
        <Row style={{ marginTop: 25 }}>
          <Col md={4} style={{ marginBottom: 15 }}>
            <b>{t('sitter_profile.one_day_appointment')}:</b>
          </Col>
          <Col md={8}>
            {allOneDays.map(({ id, date, startTime, endTime }, index) => {
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

      {allOvernight.length > 0 && (
        <Row style={{ marginTop: 15 }}>
          <Col md={4} style={{ marginBottom: 15 }}>
            <b>{t('sitter_profile.overnight_appointment')}:</b>
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

      <Row>
        <Col md={4}>
          <b style={{ fontSize: '0.9rem', flexBasis: '25%' }}>
            {t('sitter_profile.appointment_fee')}:
          </b>
        </Col>
        <Col md={8}>
          <h6>{price}</h6>
        </Col>
      </Row>

      {bookingsError && <ErrorAlert type={bookingsError} />}

      <br />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TextButton
          style={{ marginRight: 15 }}
          onClick={closeModal}
        >
          {t('form.cancel')}
        </TextButton>

        <ContainedButton onClick={onSendRequest}>
          {t('form.submit')}
          {isLoadingSendRequest && <Spinner />}
        </ContainedButton>
      </div>
    </div>
  );
}

export default SelectAppointmentTime;

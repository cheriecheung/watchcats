import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col } from 'reactstrap';
import { DatePicker, FieldLabel, TimePicker } from '../../../components/FormComponents';
import moment from 'moment';

const defaultButtonStyle = {
  marginRight: 15,
  border: 'none',
  background: 'transparent',
  outline: 'none',
  color: '#666',
};

function CreateAppointmentTime({ t, oneDayPrice, overnightPrice }) {
  const methods = useForm();
  const { register, control, handleSubmit, reset, watch } = methods;
  const oneDayStartTime = watch('oneDay.startTime');
  const oneDayEndTime = watch('oneDay.endTime');
  const overnightStartDate = watch('overnight.startDate');
  const overnightEndDate = watch('overnight.endDate');

  const [appointmentType, setAppointmentType] = useState('oneDay');
  const [oneDayStyle, setOneDayStyle] = useState(defaultButtonStyle);
  const [overnightStyle, setOvernightStyle] = useState(defaultButtonStyle);

  const [time, setTime] = useState('');
  const [location, setLocation] = useState('get owner postcode');
  const [price, setPrice] = useState('To be calculated');

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (oneDayStartTime && oneDayEndTime) {
      if (appointmentType === 'oneDay') {
        const startTimeObj = moment(oneDayStartTime, 'HH:mm');
        const endTimeObj = moment(oneDayEndTime, 'HH:mm');

        const totalHours = moment.duration(endTimeObj.diff(startTimeObj)).asHours();
        const roundUpHours = Math.ceil(totalHours);

        if (roundUpHours < 1) {
          alert('End time cannot happen before start time!');
          setPrice('To be calculated');
          return;
        } else {
          const calculatePrice = oneDayPrice * roundUpHours;
          setPrice(`€ ${calculatePrice}, 00`);
        }

        console.log({ totalHours, roundUpHours });
      }
    }
  }, [oneDayStartTime, oneDayEndTime]);

  useEffect(() => {
    if (overnightStartDate && overnightEndDate) {
      if (appointmentType === 'overnight') {
        const startDateObj = moment(overnightStartDate, 'YYYY-MM-DD');
        const endDateObj = moment(overnightEndDate, 'YYYY-MM-DD');

        const totalNights = moment.duration(endDateObj.diff(startDateObj)).asDays();

        if (totalNights < 1) {
          alert('End date cannot happen before start date!');
          setPrice('To be calculated');
          return;
        } else {
          const calculatePrice = overnightPrice * totalNights;
          setPrice(`€ ${calculatePrice}, 00`);
        }
      }
    }
  }, [overnightStartDate, overnightEndDate]);

  useEffect(() => {
    if (appointmentType === 'oneDay') {
      setOneDayStyle({ ...defaultButtonStyle, fontWeight: 'bold', color: '#ffa195' });
      setOvernightStyle(defaultButtonStyle);
      setPrice('To be calculated');
    }

    if (appointmentType === 'overnight') {
      setOvernightStyle({ ...defaultButtonStyle, fontWeight: 'bold', color: '#ffa195' });
      setOneDayStyle(defaultButtonStyle);
      setPrice('To be calculated');
    }
  }, [appointmentType]);

  return (
    <div style={{ textAlign: 'left' }}>
      <p>
        Since you do not have any appointment schedule filled out in your owner profile, please
        select a time in the following.
      </p>

      <div style={{ marginBottom: 15, display: 'flex' }}>
        <b style={{ fontSize: '0.9rem', flexBasis: '25%' }}>
          {t('sitter_profile.appointment_type')}:
        </b>
        <button style={oneDayStyle} onClick={() => setAppointmentType('oneDay')}>
          One day
        </button>
        <button style={overnightStyle} onClick={() => setAppointmentType('overnight')}>
          Overnight
        </button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {appointmentType === 'oneDay' ? (
            <Row>
              <Col md={6}>
                <div className="d-flex flex-column date-picker">
                  <FieldLabel> {t('owner_form.date')}</FieldLabel>
                  <DatePicker name="oneDay.date" />
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
                    <TimePicker name="oneDay.startTime" />
                  </div>
                  <i className="fas fa-arrow-right align-self-center mt-4" />
                  <div className="d-flex flex-column time-picker">
                    <FieldLabel> {t('owner_form.end_time')}</FieldLabel>
                    <TimePicker name="oneDay.endTime" />
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                <FieldLabel>{t('owner_form.start_date')}</FieldLabel>
                <DatePicker name="overnight.startDate" />
              </div>
              <i className="fas fa-arrow-right align-self-center mt-4" />
              <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                <FieldLabel>{t('owner_form.end_date')}</FieldLabel>
                <DatePicker name="overnight.endDate" />
              </div>
            </div>
          )}
        </form>
      </FormProvider>

      <hr style={{ margin: '35px 0 25px 0' }} />

      <div style={{ display: 'flex' }}>
        <b style={{ fontSize: '0.9rem', flexBasis: '25%' }}>
          {t('sitter_profile.appointment_fee')}:
        </b>
        <h6>{price}</h6>
      </div>
    </div>
  );
}

export default CreateAppointmentTime;

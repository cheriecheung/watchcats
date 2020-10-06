import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Row, Col } from 'reactstrap';
import { DatePicker, FieldLabel, TimePicker } from '../../../../components/FormComponents';
import { calculateOneDayPrice, calculateOvernightPrice } from '../../../../utility';

const defaultButtonStyle = {
  marginRight: 15,
  border: 'none',
  borderBottom: 'none',
  background: 'transparent',
  outline: 'none',
  color: '#666',
};

const clickedButtonStyle = {
  ...defaultButtonStyle,
  fontWeight: 'bold',
  color: '#ffa195',
  borderBottom: '2px solid #ffa195',
};

const defaultValues = {
  type: 'oneDay',
  oneDay: { date: '', startTime: '', endTime: '' },
  overnight: { startDate: '', endDate: '' },
  price: 'To be calculated',
};

function CreateAppointmentTime({
  t,
  oneDayPrice,
  overnightPrice,
  modalVisible,
  setAppointmentData,
}) {
  const methods = useForm({ defaultValues });
  const { register, control, handleSubmit, setValue, reset, watch } = methods;
  const type = watch('type');
  const oneDayDate = watch('oneDay.date');
  const oneDayStartTime = watch('oneDay.startTime');
  const oneDayEndTime = watch('oneDay.endTime');
  const overnightStartDate = watch('overnight.startDate');
  const overnightEndDate = watch('overnight.endDate');
  const price = watch('price');

  const [oneDayStyle, setOneDayStyle] = useState(defaultButtonStyle);
  const [overnightStyle, setOvernightStyle] = useState(defaultButtonStyle);

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    register({ name: 'price' });
  }, [register]);

  useEffect(() => {
    if (oneDayDate && oneDayStartTime && oneDayEndTime) {
      const priceValue = calculateOneDayPrice(oneDayStartTime, oneDayEndTime, oneDayPrice);

      if (typeof priceValue === 'number') {
        setValue('price', `€ ${priceValue}, 00`);
      } else {
        setValue('price', priceValue);
      }

      setAppointmentData({
        type,
        date: oneDayDate,
        startTime: oneDayStartTime,
        endTime: oneDayEndTime,
        price: priceValue,
      });
    }
  }, [oneDayStartTime, oneDayEndTime]);

  useEffect(() => {
    if (overnightStartDate && overnightEndDate) {
      const priceValue = calculateOvernightPrice(
        overnightStartDate,
        overnightEndDate,
        overnightPrice
      );

      if (typeof priceValue === 'number') {
        setValue('price', `€ ${priceValue}, 00`);
      } else {
        setValue('price', priceValue);
      }

      setAppointmentData({
        type,
        startDate: overnightStartDate,
        endDate: overnightEndDate,
        price: priceValue,
      });
    }
  }, [overnightStartDate, overnightEndDate]);

  useEffect(() => {
    if (type === 'oneDay') {
      setOneDayStyle(clickedButtonStyle);
      setOvernightStyle(defaultButtonStyle);
    }

    if (type === 'overnight') {
      setOvernightStyle(clickedButtonStyle);
      setOneDayStyle(defaultButtonStyle);
    }
  }, [type]);

  useEffect(() => {
    if (!modalVisible) {
      reset(defaultValues);
    }
  }, [modalVisible]);

  return (
    <div style={{ textAlign: 'left' }}>
      <p>
        As you haven't set an appointment time in your owner profile, please select a time in the
        following.
      </p>

      <Row>
        <Col md={3}>
          <b style={{ fontSize: '0.9rem', flexBasis: '25%' }}>
            {t('sitter_profile.appointment_type')}:
          </b>
        </Col>
        <Col md={9} style={{ marginBottom: 25 }}>
          <button style={oneDayStyle} onClick={() => reset({ type: 'oneDay' })}>
            One day
          </button>
          <button style={overnightStyle} onClick={() => reset({ type: 'overnight' })}>
            Overnight
          </button>
        </Col>
      </Row>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === 'oneDay' ? (
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

      <Row>
        <Col md={3}>
          <b style={{ fontSize: '0.9rem', flexBasis: '25%' }}>
            {t('sitter_profile.appointment_fee')}:
          </b>
        </Col>
        <Col md={9}>
          <h6>{price}</h6>
        </Col>
      </Row>
    </div>
  );
}

export default CreateAppointmentTime;

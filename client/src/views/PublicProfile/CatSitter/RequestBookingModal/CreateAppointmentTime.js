import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { DatePicker, FieldLabel, TimePicker } from '../../../../components/FormComponents';
import { ContainedButton } from '../../../../components/UIComponents'
import { useCreateAppointmentTime } from '../../viewModel'

function CreateAppointmentTime({ t, modalVisible }) {
  const {
    FormProvider,
    methods,
    type,
    price,
    onSendRequest,
    resetForm,
    oneDayStyle,
    overnightStyle
  } = useCreateAppointmentTime();

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!modalVisible) {
      resetForm();
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
        <form onSubmit={handleSubmit(onSendRequest)}>
          {type === 'oneDay' ? (
            <Row>
              <Col md={4}>
                <div className="d-flex flex-column date-picker">
                  <FieldLabel> {t('owner_form.date')}</FieldLabel>
                  <DatePicker name="oneDay.date" />
                </div>
              </Col>
              <Col md={8}>
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
        <Col md={4}>
          <b style={{ fontSize: '0.9rem', flexBasis: '25%' }}>
            {t('sitter_profile.appointment_fee')}:
          </b>
        </Col>
        <Col md={8}>
          <h6>{price}</h6>
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ContainedButton onClick={onSendRequest}>Submit</ContainedButton>
      </div>
    </div>
  );
}

export default CreateAppointmentTime;

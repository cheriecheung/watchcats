import React from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { themeColor } from '../../../style/theme';
import { DatePicker, TimePicker, FieldLabel } from '../../../components/FormComponents';
import { TextButton } from '../../../components/UIComponents';
import { oneDayObj, overnightObj } from '../_defaultValues'

const color = '#252525';

function AppointmentTime({ watch, oneDayFieldArray, overnightFieldArray }) {
  const { t } = useTranslation();
  const { fields: oneDayFields, remove: oneDayRemove, append: oneDayAppend } = oneDayFieldArray;
  const { fields: overnightFields, remove: overnightRemove, append: overnightAppend } = overnightFieldArray;

  const bookingOneDay = watch('bookingOneDay');
  const bookingOvernight = watch('bookingOvernight')

  return (
    <>
      {oneDayFields.map((item, index) => {
        return (
          <div key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 hidden={index === 0}>
                {t('owner_form.one_day')} #{index + 1}
              </h6>
              <TextButton
                hidden={index === 0}
                onClick={() => oneDayRemove(index)}
                style={{ float: 'right', color: themeColor.peach }}
              >
                {t('owner_form.remove')}
              </TextButton>
            </div>

            <Row>
              <Col md={6}>
                <div className="d-flex flex-column date-picker">
                  <FieldLabel> {t('owner_form.date')}</FieldLabel>
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
                    <FieldLabel> {t('owner_form.start_time')}</FieldLabel>
                    <TimePicker
                      name={`bookingOneDay[${index}].startTime`}

                    />
                  </div>

                  <i className="fas fa-arrow-right align-self-center mt-4" />

                  <div className="d-flex flex-column time-picker">
                    <FieldLabel> {t('owner_form.end_time')}</FieldLabel>
                    <TimePicker name={`bookingOneDay[${index}].endTime`} />
                  </div>
                </div>
              </Col>
            </Row>

            <hr hidden={bookingOneDay && bookingOneDay.length === 1} style={{ margin: '30px 0' }} />
          </div>
        );
      })}
      <TextButton
        hidden={bookingOneDay && bookingOneDay.length >= 2}
        onClick={() => oneDayAppend(oneDayObj)}
        style={{ color: '#5FBB96' }}
      >
        <i className="fas fa-plus mr-1" />
        {t('owner_form.add_period')}
      </TextButton>
      <span hidden={bookingOneDay && bookingOneDay.length < 2}>
        You can at most request 2 one-day appointments at the same time!
      </span>

      <h6 style={{ marginTop: 40 }}> {t('owner_form.overnight')}</h6>

      {overnightFields.map((item, index) => {
        return (
          <div key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 hidden={index === 0} style={{ color }}>
                {t('owner_form.overnight')} visit #{index + 1}
              </h6>
              <TextButton
                hidden={index === 0}
                onClick={() => overnightRemove(index)}
                style={{ float: 'right', color: themeColor.peach }}
              >
                {t('owner_form.remove')}
              </TextButton>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                <FieldLabel>{t('owner_form.start_date')}</FieldLabel>
                <DatePicker name={`bookingOvernight[${index}].startDate`} />
              </div>

              <i className="fas fa-arrow-right align-self-center mt-4" />

              <div className="d-flex flex-column date-picker overnight-visit-date-picker">
                <FieldLabel>{t('owner_form.end_date')}</FieldLabel>
                <DatePicker name={`bookingOvernight[${index}].endDate`} />
              </div>
            </div>
            <hr hidden={bookingOvernight && bookingOvernight.length === 1} style={{ margin: '30px 0' }} />
          </div>
        );
      })}

      <TextButton
        hidden={bookingOvernight && bookingOvernight.length >= 2}
        onClick={() => overnightAppend(overnightObj)}
        style={{ color: '#5FBB96' }}
      >
        <i className="fas fa-plus mr-1" />
        {t('owner_form.add_period')}
      </TextButton>
      <span hidden={bookingOvernight && bookingOvernight.length < 2}>
        You can at most request 2 overnight sitting appointments at the same time!
      </span>
    </>
  );
}

export default AppointmentTime;

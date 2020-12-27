import React from 'react';
import { Row, Col } from 'reactstrap';
import { themeColor } from '../../../style/theme';
import { DatePicker, TimePicker, FieldLabel } from '../../../components/FormComponents';
import { OutlinedButton, TextButton } from '../../../components/UIComponents';

const color = '#252525';

function AppointmentTime({ t, bookingOneDayProps, bookingOvernightProps }) {
  const { bookingOneDay, oneDayFields, addOneDay, removeOneDay } = bookingOneDayProps;
  const { bookingOvernight, overnightFields, addOvernight, removeOvernight } = bookingOvernightProps;

  return (
    <>
      {oneDayFields.map((item, index) => {
        return (
          <div key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 hidden={index === 0}>
                {t('owner_form.one_day', { index: index + 1 })}
              </h6>
              <TextButton
                hidden={index === 0}
                onClick={() => removeOneDay(index)}
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

      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <OutlinedButton
          type="button"
          hidden={bookingOneDay && bookingOneDay.length >= 2}
          onClick={addOneDay}
        >
          <i className="fas fa-plus mr-1" />
          {t('owner_form.add_period')}
        </OutlinedButton>
      </div>

      <span hidden={bookingOneDay && bookingOneDay.length < 2}>
        {t('owner_form.maximum_one_day')}
      </span>

      <h6 style={{ marginTop: 40 }}> {t('owner_form.overnight', { index: null })}</h6>

      {overnightFields.map((item, index) => {
        return (
          <div key={item.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 hidden={index === 0} style={{ color }}>
                {t('owner_form.overnight', { index: index + 1 })}
              </h6>
              <TextButton
                hidden={index === 0}
                onClick={() => removeOvernight(index)}
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

      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <OutlinedButton
          type="button"
          hidden={bookingOvernight && bookingOvernight.length >= 2}
          onClick={addOvernight}
        >
          <i className="fas fa-plus mr-1" />
          {t('owner_form.add_period')}
        </OutlinedButton>
      </div>

      <span hidden={bookingOvernight && bookingOvernight.length < 2}>
        {t('owner_form.maximum_overnight')}
      </span>
    </>
  );
}

export default AppointmentTime;

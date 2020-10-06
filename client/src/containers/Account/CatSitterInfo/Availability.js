import React from 'react';
import { Row, Col } from 'reactstrap';
import { Calendar } from '../../../components/FormComponents';
import { useTranslation } from 'react-i18next';
import { DateUtils } from 'react-day-picker';

function Availability({ reset, watch }) {
  const { t } = useTranslation();
  const selectedDays = watch('unavailableDates') || [];

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
    reset({ unavailableDates: allDays });
  };

  return (
    <Row>
      <Col md={12}>
        <p>{t('sitter_form.availability_description')}</p>
      </Col>
      <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Calendar
          name="unavailableDates"
          selectedDays={selectedDays}
          handleDayClick={handleDayClick}
        />
      </Col>
      <Col
        md={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 15,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div className="calendar-available-date-box" />
          <span>{t('sitter_form.available')}</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 50,
          }}
        >
          <div className="calendar-unavailable-date-box" />
          <span>{t('sitter_form.unavailable')}</span>
        </div>
      </Col>
    </Row>
  );
}

export default Availability;

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
    <>
      <p>{t('sitter_form.availability_description')}</p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15,
      }}
      >
        <Calendar
          name="unavailableDates"
          selectedDays={selectedDays}
          handleDayClick={handleDayClick}
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="calendar-available-date-box" />
          <span>{t('sitter_form.available')}</span>
          <div className="calendar-unavailable-date-box" />
          <span>{t('sitter_form.unavailable')}</span>
        </div>
      </div>
    </>
  );
}

export default Availability;

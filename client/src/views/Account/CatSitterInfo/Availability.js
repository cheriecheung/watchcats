import React from 'react';
import { Calendar } from '../../../components/FormComponents';

function Availability({ t, selectedUnavailableDays, onDayClick }) {
  return (
    <>
      <p>{t('sitter_form.availability_description')}</p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
      }}
      >
        <Calendar
          name="unavailableDates"
          selectedDays={selectedUnavailableDays}
          handleDayClick={onDayClick}
        />
        <br />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="calendar-available-date-box" />
          <span style={{ marginRight: 35 }}>{t('sitter_form.available')}</span>
          <div className="calendar-unavailable-date-box" />
          <span>{t('sitter_form.unavailable')}</span>
        </div>
      </div>
    </>
  );
}

export default Availability;

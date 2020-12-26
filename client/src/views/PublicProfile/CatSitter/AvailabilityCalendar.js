import React from 'react';
import DayPicker from 'react-day-picker';

function AvailabilityCalendar({ t, unavailableDates }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 15,
    }}
    >
      {/* enable dutch version */}
      <DayPicker disabledDays={{ before: new Date() }} selectedDays={unavailableDates} />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="calendar-available-date-box" />
        <span style={{ marginRight: 35 }}>{t('sitter_form.available')}</span>
        <div className="calendar-unavailable-date-box" />
        <span>{t('sitter_form.unavailable')}</span>
      </div>
    </div>
  );
}

export default AvailabilityCalendar;

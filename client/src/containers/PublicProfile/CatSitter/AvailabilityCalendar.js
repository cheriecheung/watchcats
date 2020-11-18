import React from 'react';
import DayPicker from 'react-day-picker';
import { useTranslation } from 'react-i18next';

function AvailabilityCalendar({ unavailableDates }) {
  const { t } = useTranslation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 15,
    }}
    >
      <DayPicker disabledDays={{ before: new Date() }} selectedDays={unavailableDates} />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="calendar-available-date-box" />
        <span>{t('sitter_form.available')}</span>
        <div className="calendar-unavailable-date-box" />
        <span>{t('sitter_form.unavailable')}</span>
      </div>
    </div>
  );
}

export default AvailabilityCalendar;

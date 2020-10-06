import React from 'react';
import DayPicker from 'react-day-picker';

function AvailabilityCalendar({ unavailableDates }) {
  return (
    <>
      <DayPicker disabledDays={{ before: new Date() }} selectedDays={unavailableDates} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div className="calendar-available-date-box" />
        <span>Available</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 50,
        }}
      >
        <div className="calendar-unavailable-date-box" />
        <span>Unavailable</span>
      </div>
    </>
  );
}

export default AvailabilityCalendar;

import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import DayPicker from 'react-day-picker';

function Calendar({ name, selectedDays = [], handleDayClick }) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      name={name}
      as={
        <DayPicker
          name={name}
          disabledDays={{ before: new Date() }}
          selectedDays={selectedDays}
          onDayClick={handleDayClick}
          className="form-component"
        />
      }
      control={control}
    />
  );
}

export default Calendar

Calendar.propTypes = {
  name: PropTypes.string.isRequired,
  selectedDays: PropTypes.array,
  handleDayClick: PropTypes.func.isRequired
};
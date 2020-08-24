import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DayPicker from 'react-day-picker';

export default function Calendar({ name, selectedDays, handleDayClick }) {
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
        />
      }
      control={control}
    />
  );
}

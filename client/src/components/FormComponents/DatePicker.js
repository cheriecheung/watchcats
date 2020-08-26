import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

export default function DatePicker({ name, placeholder }) {
  const { control, watch, setValue, errors } = useFormContext();

  // if selected dates are already behind today, set as null
  const selectedDate = watch(name);

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <AntDatePicker
          placeholder={placeholder}
          disabledDate={(current) => {
            return current && current < moment();
          }}
          onChange={(date, dateString) => setValue(name, dateString)}
          value={selectedDate ? moment(selectedDate, 'YYYY-MM-DD') : null}
        />
      )}
    />
  );
}

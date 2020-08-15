import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

export default function DatePicker({ name, title }) {
  const { control, errors } = useFormContext();

  return (
    <div className="d-flex flex-column date-picker">
      <label>{title}</label>

      <Controller
        name={name}
        as={<AntDatePicker placeholder="" />}
        control={control}
      />
    </div>
  );
}

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';

export default function DatePicker({ name }) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      name={name}
      as={<AntDatePicker placeholder="" />}
      control={control}
    />
  );
}

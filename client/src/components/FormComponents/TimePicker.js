import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TimePicker as AntTimePicker } from 'antd';
import moment from 'moment';

export default function TimePicker({ name, title }) {
  const { control, errors } = useFormContext();

  return (
    <div className="d-flex flex-column time-picker">
      <label>{title}</label>

      <Controller
        name={name}
        as={
          <AntTimePicker
            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
            placeholder=""
            showNow={false}
          />
        }
        control={control}
      />
    </div>
  );
}

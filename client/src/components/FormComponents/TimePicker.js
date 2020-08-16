import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TimePicker as AntTimePicker } from 'antd';
import moment from 'moment';

export default function TimePicker({ name }) {
  const { control, errors } = useFormContext();

  const allSeconds = () => {
    const arr = Array.apply(null, Array(60));
    const allSeconds = arr.map((item, index) => index);

    return allSeconds;
  };

  return (
    <Controller
      name={name}
      as={
        <AntTimePicker
          defaultOpenValue={moment('00:00:00', 'HH:mm')}
          format="HH:mm"
          placeholder=""
          showNow={false}
          minuteStep={15}
          disabledHours={() => [0, 1, 2, 3, 4, 23]}
          disabledSeconds={() => allSeconds()}
          hideDisabledOptions={true}
        />
      }
      control={control}
    />
  );
}

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TimePicker as AntTimePicker } from 'antd';
import moment from 'moment';

export default function TimePicker({ name }) {
  const { control, watch, setValue, errors } = useFormContext();

  const allSeconds = () => {
    const arr = Array.apply(null, Array(60));
    const allSeconds = arr.map((item, index) => index);

    return allSeconds;
  };

  const selectedTime = watch(name);

  console.log({ selectedTime });

  return (
    <>
      <Controller
        name={name}
        render={() => (
          <AntTimePicker
            //defaultOpenValue={moment('00:00:00', 'HH:mm')}
            defaultValue={moment('00:00:00', 'HH:mm')}
            format="HH:mm"
            placeholder=""
            showNow={false}
            minuteStep={15}
            disabledHours={() => [0, 1, 2, 3, 4, 23]}
            disabledSeconds={() => allSeconds()}
            hideDisabledOptions={true}
            onChange={(date, timeString) => setValue(name, new Date(`1970-01-01 ${timeString}`))}
            value={selectedTime ? moment(new Date(selectedTime), 'hh:mm') : null}
          />
        )}
        control={control}
      />
      {/* <Controller
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
      /> */}
    </>
  );
}

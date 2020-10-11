import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TimePicker as AntTimePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

const allSeconds = () => {
  const arr = Array.apply(null, Array(60));
  const allSeconds = arr.map((item, index) => index);
  return allSeconds;
};

const ErrorDisplay = styled.span`
  display: inline-block;
  color: #E56E5A;
  text-align: right;
  margin-top: 5px;
`

export default function TimePicker({ name, index, arrayName, fieldName }) {
  const { control, watch, setValue, errors } = useFormContext();
  const error = errors[arrayName]
  const message =
    error &&
    error[index] &&
    error[index][fieldName] &&
    error[index][fieldName].message

  const selectedTime = watch(name);

  const handleOnChange = (date, timeString) => {
    if (!date) {
      setValue(name, null);
    } else {
      setValue(name, new Date(`1970-01-01 ${timeString}`));
    }
  }

  return (
    <>
      <Controller
        name={name}
        render={() => (
          <AntTimePicker
            // placeholder=""
            //defaultValue={moment('00:00:00', 'HH:mm')}
            defaultOpenValue={moment('05:00', 'HH:mm')}
            format="HH:mm"
            showNow={false}
            minuteStep={15}
            disabledHours={() => [0, 1, 2, 3, 4, 23]}
            disabledSeconds={() => allSeconds()}
            hideDisabledOptions={true}
            onChange={handleOnChange}
            value={selectedTime ? moment(new Date(selectedTime), 'hh:mm') : null}
          //onChange={(date, timeString) => setValue(name, timeString)}
          //value={selectedTime ? moment(selectedTime, 'hh:mm') : null}
          />
        )}
        control={control}
      />
      <ErrorDisplay hidden={!error}>{message}</ErrorDisplay>
    </>
  );
}

import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

const ErrorDisplay = styled.span`
  display: inline-block;
  color: #E56E5A;
  float: right;
  text-align: right;
`

export default function DatePicker({ name, index, arrayName, fieldName, placeholder }) {
  const { control, watch, setValue, errors } = useFormContext();
  const error = errors[arrayName]
  const message =
    error &&
    error[index] &&
    error[index][fieldName] &&
    error[index][fieldName].message

  useEffect(() => {
    console.log({ error })
  }, [error])

  const selectedDate = watch(name);

  return (
    <>
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
      <ErrorDisplay hidden={!error}>{message}</ErrorDisplay>
    </>
  );
}

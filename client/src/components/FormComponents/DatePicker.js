import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'

const Field = styled(AntDatePicker)`
  border: 1px solid ${props => props.hasError ? '#E56E5A' : '#d9d9d9'};
`

const ErrorDisplay = styled.span`
  display: inline-block;
  color: #E56E5A;
  float: right;
  text-align: right;
`

export default function DatePicker({ name, index, placeholder }) {
  const { control, watch, setValue, errors } = useFormContext();
  const { error, hasError, message } = getErrorProperties(name, index, errors)

  const selectedDate = watch(name);

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={() => (
          <Field
            hasError={hasError}
            placeholder={placeholder}
            disabledDate={(current) => {
              return current && current < moment();
            }}
            onChange={(date, dateString) => setValue(name, dateString)}
            value={selectedDate ? moment(selectedDate, 'YYYY-MM-DD') : null}
          />
        )}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </>
  );
}

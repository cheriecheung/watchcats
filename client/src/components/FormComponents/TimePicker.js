import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TimePicker as AntTimePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'

const Field = styled(AntTimePicker)`
border: 1px solid ${props => props.hasError ? '#E56E5A' : '#d9d9d9'};
`

const ErrorDisplay = styled.span`
  display: inline-block;
  color: #E56E5A;
  text-align: right;
  margin-top: 5px;
`

const allSeconds = () => {
  const arr = Array.apply(null, Array(60));
  const allSeconds = arr.map((item, index) => index);
  return allSeconds;
};

export default function TimePicker({ name }) {
  const { control, watch, setValue, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)
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
          <Field
            hasError={hasError}
            // placeholder=""
            //defaultOpenValue={moment('05:00', 'HH:mm')}
            defaultValue={moment('05:00', 'HH:mm')}
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
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </>
  );
}

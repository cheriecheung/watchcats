import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Rate } from 'antd';
import ErrorDisplay from './ErrorDisplay';

export default function RateField({ name }) {
  const { control, errors } = useFormContext();
  const error = errors[name]
  const message = error && error.message || 'Required field'

  return (
    <>
      <Controller
        name={name}
        as={<Rate error={error} />}
        control={control}
      />
      <ErrorDisplay hidden={!error}>{message}</ErrorDisplay>
    </>
  );
}

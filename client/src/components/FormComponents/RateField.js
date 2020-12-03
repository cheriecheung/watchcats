import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Rate } from 'antd';
import ErrorDisplay from './ErrorDisplay';

function RateField({ name }) {
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

export default RateField

RateField.propTypes = {
  name: PropTypes.string.isRequired
};

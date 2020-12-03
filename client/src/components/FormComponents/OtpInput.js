import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components'
import ErrorDisplay from './ErrorDisplay'
import OtpInput from 'react-otp-input';

const OtpInputComponent = styled(OtpInput)`
  margin: 10px 5px;

  & > input {
    width: 40px !important;
    height: 50px;
    border: 1px solid #666;
    border-radius: 10px;
    font-size: 30px;
    transition: 0.4s all;
  }

  & > input:focus {
    outline: none;
    box-shadow: 0 0 3pt 2pt pink;
  }
`;

function ReactOtpInput({ name }) {
  const { control, errors } = useFormContext();
  const error = errors[name]
  const message = error && error.message || 'Required field'

  return (
    <>
      <Controller
        name={name}
        as={<OtpInputComponent numInputs={6} isInputNum={true} />}
        control={control}
      />
      <ErrorDisplay hidden={!error}>{message}</ErrorDisplay>
    </>
  )
}

export default ReactOtpInput

ReactOtpInput.propTypes = {
  name: PropTypes.string.isRequired
};
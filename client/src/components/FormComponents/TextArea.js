import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import ErrorDisplay from './ErrorDisplay';

const Input = styled.textarea`
  width: 100%;
  padding: 7px 15px;
  border: 1px solid ${props => props.error ? '#E56E5A' : '#d9d9d9'};
  border-radius: 10px !important;
  outline: none;
  resize: none;
`

function TextArea({ name, placeholder, rows = 7, customStyle }) {
  const { control, errors } = useFormContext();
  const error = errors[name]
  const message = error && error.message || 'Required field'

  return (
    <>
      <Controller
        name={name}
        as={
          <Input
            error={error}
            rows={rows}
            placeholder={placeholder}
            style={customStyle}
          />
        }
        control={control}
      />
      <ErrorDisplay hidden={!error}>{message}</ErrorDisplay>
    </>
  );
}

export default TextArea

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  customStyle: PropTypes.object,
};

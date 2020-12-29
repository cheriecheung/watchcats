import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import ErrorDisplay from './ErrorDisplay';

const Input = styled.textarea`
  width: 100%;
  padding: 7px 15px;
  border: 1px solid ${({ error }) => error ? '#E56E5A' : '#d9d9d9'};
  border-radius: 10px !important;
  outline: none;
  resize: none;
  transition: all 0.3s ease-out;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0.5em;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c5c1c7;
    outline: none;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent !important;
    color: transparent !important;
  }
`

function TextArea({ name, placeholder, rows = 7 }) {
  const { control, errors } = useFormContext();
  const error = errors[name]
  const message = error && error.message || "form_error.field_required"

  return (
    <>
      <Controller
        name={name}
        as={
          <Input
            error={error}
            rows={rows}
            placeholder={placeholder}
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
};

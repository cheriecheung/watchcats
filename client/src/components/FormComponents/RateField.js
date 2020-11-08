import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Rate } from 'antd';
import styled from 'styled-components';

// const Input = styled.textarea`
//   width: 100%;
//   padding: 7px 15px;
//   border: 1px solid ${props => props.error ? '#E56E5A' : '#d9d9d9'};
//   border-radius: 10px !important;
//   font-size: 0.9rem;
//   outline: none;
//   resize: none;
// `

const ErrorDisplay = styled.span`
  color: #E56E5A;
  float: right;
`

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

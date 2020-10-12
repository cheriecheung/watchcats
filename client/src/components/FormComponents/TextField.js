import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input as AntInput } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 20px;
`

const Input = styled(AntInput)`
  margin-bottom: 5px;
  padding: 7px 15px;
  border: 1px solid ${props => props.error ? '#E56E5A' : '#d9d9d9'};
  border-radius: 10px;
`

const ErrorDisplay = styled.span`
  color: #E56E5A;
  float: right;
`

export default function TextField({ name, index, prefix, placeholder, disabled }) {
  const { control, errors } = useFormContext();
  let error, hasError, message;

  if (typeof index === 'number') {
    const arrayName = name.substr(0, name.indexOf('['));
    const fieldName = name.substr(name.indexOf(".") + 1);

    error = errors[arrayName]
    hasError = error && error[index] && error[index].hasOwnProperty(fieldName)
    message =
      error &&
      error[index] &&
      error[index][fieldName] &&
      error[index][fieldName].message
  } else {
    error = errors[name]
    hasError = error
    message = error && error.message || 'Required field'
  }

  useEffect(() => {
    console.log({ errors, error, name })

  }, [errors, error])

  return (
    <Container>
      <Controller
        name={name}
        as={
          <Input
            prefix={prefix}
            placeholder={placeholder}
            error={hasError}
            disabled={disabled}
          />
        }
        control={control}
      />
      <ErrorDisplay hidden={!error}>{message}</ErrorDisplay>
    </Container>
  );
}

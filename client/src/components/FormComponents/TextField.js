import React from 'react';
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

const ErrorMessage = styled.span`
  color: #E56E5A;
  float: right;
`

export default function TextField({ name, prefix, placeholder, disabled, errorLabel = 'Required field' }) {
  const { control, errors } = useFormContext();
  const error = errors[name]

  return (
    <Container>
      <Controller
        name={name}
        as={
          <Input
            prefix={prefix}
            placeholder={placeholder}
            error={error}
            disabled={disabled}
          />
        }
        control={control}
      />
      <ErrorMessage hidden={!error}>{errorLabel}</ErrorMessage>
    </Container>
  );
}

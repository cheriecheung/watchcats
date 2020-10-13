import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input as AntInput } from 'antd';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'

const Container = styled.div`
  margin-bottom: 20px;
`

const Input = styled(AntInput)`
  margin-bottom: 5px;
  padding: 7px 15px;
  border: 1px solid ${props => props.hasError ? '#E56E5A' : '#d9d9d9'};
  border-radius: 10px;
`

const ErrorDisplay = styled.span`
  color: #E56E5A;
  float: right;
`

export default function TextField({ name, prefix, placeholder, disabled, type = "text" }) {
  const { control, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  return (
    <Container>
      <Controller
        name={name}
        as={
          <Input
            prefix={prefix}
            placeholder={placeholder}
            hasError={hasError}
            disabled={disabled}
            type={type}
          />
        }
        control={control}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </Container>
  );
}

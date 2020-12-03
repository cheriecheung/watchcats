import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Input as AntInput } from 'antd';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'
import ErrorDisplay from './ErrorDisplay';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Input = styled(AntInput)`
  margin-bottom: 5px;
  padding: 0 15px;
  border: 1px solid ${props => props.error ? '#E56E5A' : '#d9d9d9'};
  border-radius: 10px;
`

function PasswordField({ name }) {
  const { control, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  return (
    <Container>
      <Controller
        name={name}
        as={<Input.Password error={hasError} />}
        control={control}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </Container>
  );
}

export default PasswordField

PasswordField.propTypes = {
  name: PropTypes.string.isRequired
};
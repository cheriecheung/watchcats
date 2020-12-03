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
  margin-bottom: 10px;
`

const Input = styled(AntInput)`
  margin-bottom: 5px;
  padding: 7px 15px;
  border: 1px solid ${props => props.error ? '#E56E5A' : '#d9d9d9'};
  border-radius: 10px;
  font-size: unset;
  color: #7f7f7f;
`

function TextField({ name, prefix, placeholder, disabled, type = "text", style }) {
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
            error={hasError}
            disabled={disabled}
            type={type}
            style={style}
          />
        }
        control={control}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </Container>
  );
}

export default TextField

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.node,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  style: PropTypes.object,
};

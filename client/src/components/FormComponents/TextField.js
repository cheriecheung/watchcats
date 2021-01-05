import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
  border: 1px solid ${({ error }) => error ? '#E56E5A' : '#d9d9d9'};
  border-radius: 10px;
  font-size: unset;
  color: #7f7f7f;
`

function TextField({
  name,
  prefix,
  placeholder,
  disabled,
  type,
  style,
  maxLength
}) {
  const { t } = useTranslation();
  const { control, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  const translatedPlaceholder = placeholder ? t(placeholder) : ''

  return (
    <Container>
      <Controller
        name={name}
        as={
          <Input
            prefix={prefix}
            placeholder={translatedPlaceholder}
            error={hasError}
            disabled={disabled}
            type={type}
            maxLength={maxLength}
            style={style}
            className="form-control"
          />
        }
        control={control}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </Container>
  );
}

export default TextField

Input.propTypes = {
  error: PropTypes.bool,
}

Input.defaultProps = {
  error: undefined,
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.node,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  style: PropTypes.object,
};

TextField.defaultProps = {
  prefix: React.createElement('div'),
  placeholder: undefined,
  disabled: false,
  type: 'text',
  maxLength: 150,
  style: {},
};

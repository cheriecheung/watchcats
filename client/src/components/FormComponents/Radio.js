import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Radio as AntRadio } from 'antd';
import { getErrorProperties } from '../../utility'
import styled from 'styled-components';
import ErrorDisplay from './ErrorDisplay';

export function RadioGroup({ name, children }) {
  const { control, watch, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  return (
    <div style={{ marginBottom: 20 }}>
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => (
          <AntRadio.Group
            //defaultValue={watch(name)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="custom-radio-group"
          >
            {children}
          </AntRadio.Group>
        )}
      />
      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </div>
  );
}

export function RadioButton({ value, children, style }) {
  return (
    <AntRadio.Button value={value} className="custom-radio-button" style={style}>
      {children}
    </AntRadio.Button>
  );
}

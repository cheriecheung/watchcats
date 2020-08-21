import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Radio as AntRadio } from 'antd';

export function RadioGroup({ name, children }) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange }) => (
        <AntRadio.Group
          onChange={(e) => onChange(e.target.value)}
          className="custom-radio-group"
        >
          {children}
        </AntRadio.Group>
      )}
    />
  );
}

export function RadioButton({ value, children, style }) {
  return (
    <AntRadio.Button
      value={value}
      className="custom-radio-button"
      style={style}
    >
      {children}
    </AntRadio.Button>
  );
}

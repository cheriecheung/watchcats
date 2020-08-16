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
        <AntRadio.Group onChange={(e) => onChange(e.target.value)}>
          {children}
        </AntRadio.Group>
      )}
    />
  );
}

export function RadioButton({ value, label }) {
  return (
    <AntRadio value={value} className="mr-5" style={{ width: 60 }}>
      <span className="ml-2">{label}</span>
    </AntRadio>
  );
}

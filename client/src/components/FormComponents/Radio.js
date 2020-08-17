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
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {children}
        </AntRadio.Group>
      )}
    />
  );
}

export function RadioButton({ value, children }) {
  return (
    <AntRadio.Button
      value={value}
      style={{
        width: '40%',
        height: 40,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </AntRadio.Button>
  );
}

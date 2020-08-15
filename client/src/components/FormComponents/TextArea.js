import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { themeColor } from '../../style/theme';

export default function TextArea({ name, placeholder, rows = 10 }) {
  const { control, errors } = useFormContext();

  return (
    // no Controller needed for uncontrolled component

    <Controller
      name={name}
      as={
        <textarea
          placeholder={placeholder}
          rows={rows}
          className="form-control"
          style={{
            resize: 'none',
            fontSize: '0.9rem',
            // background: 'rgba(15,126,107, 0.08)',
          }}
        />
      }
      control={control}
    />
  );
}

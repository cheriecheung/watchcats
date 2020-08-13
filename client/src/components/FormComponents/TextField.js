import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function TextField({ name, title }) {
  const { control, errors } = useFormContext();

  return (
    // no Controller needed for uncontrolled component
    <Controller
      name={name}
      as={
        <>
          <label>{title}</label>
          <input type="text" name={name} className="form-control" />
        </>
      }
      control={control}
    />
  );
}

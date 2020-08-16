import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'antd';

export default function TextField({ name, title, prefix }) {
  const { control, errors } = useFormContext();

  return (
    <>
      <label>{title}</label>

      <Controller
        name={name}
        as={<Input prefix={prefix} />}
        control={control}
      />
    </>
  );
}

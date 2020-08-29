import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'antd';

export default function TextField({ name, prefix, placeholder }) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      name={name}
      as={<Input prefix={prefix} placeholder={placeholder} />}
      control={control}
    />
  );
}

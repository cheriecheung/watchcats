import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

export default function Dropdown({ name, children }) {
  const { control, errors } = useFormContext();

  return <Controller control={control} name={name} />;
}

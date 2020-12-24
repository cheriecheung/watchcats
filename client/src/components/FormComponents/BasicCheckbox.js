import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const Checkbox = styled.input`
  margin-top: 2px;
  margin-right: 10px;
  width: 18px;
  height: 18px;
`

function BasicCheckbox({ name, content }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      as={
        <div style={{ display: 'flex' }}>
          <Checkbox type="checkbox" id={name} name={name} />
          <label for={name}>{content}</label>
        </div>
      }
      control={control}
    />
  );
}

export default BasicCheckbox

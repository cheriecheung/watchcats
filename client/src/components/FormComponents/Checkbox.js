import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox as AntCheckbox } from 'antd';
import styled from 'styled-components';

export default function Checkbox({ name, children }) {
  const { control, errors } = useFormContext();

  const Container = styled.div`
    margin-bottom: 20px;
  `;

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ value, onChange }) => (
          <AntCheckbox
            checked={value}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
          >
            {children}
          </AntCheckbox>
        )}
      />
    </Container>
  );
}

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox as AntCheckbox } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 20px;
`;

export function Checkbox({ name, children }) {
  const { control, errors } = useFormContext();

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ value, onChange }) => (
          <AntCheckbox
            className="custom-checkbox-basic"
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

export function CheckboxGroup({ name, options }) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      as={
        <AntCheckbox.Group
          options={options}
          className="custom-checkbox-group"
        />
      }
    />
  );
}

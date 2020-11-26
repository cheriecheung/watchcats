import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox as AntCheckbox } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex !important;
  margin-bottom: 20px;
`;

const CheckboxComponent = styled(AntCheckbox)`
  display: flex;
  justify-content: space-between;
  width: ${props => props.width ? props.width : '100%'};
`

function Checkbox({ name, children, width }) {
  const { control, errors } = useFormContext();

  return (
    <Container>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ value, onChange }) => (
          <CheckboxComponent
            //className="custom-checkbox-basic"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            width={width}
          >
            {children}
          </CheckboxComponent>
        )}
      />
    </Container>
  );
}

export default Checkbox
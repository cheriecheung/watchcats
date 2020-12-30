import React from 'react';
import PropTypes from 'prop-types';
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
  width: ${({ width }) => width};
`

function Checkbox({
  name,
  children,
  width,
  containerStyle,
}) {
  const { control } = useFormContext();

  return (
    <Container style={containerStyle}>
      <Controller
        control={control}
        name={name}
        defaultValue={false}
        render={({ value, onChange }) => (
          <CheckboxComponent
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

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  containerStyle: PropTypes.object
};

Checkbox.defaultProps = {
  width: '100%',
  containerStyle: {}
}
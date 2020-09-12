import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
`;

export default function FieldLabel({ children, customStyle }) {
  return <Label style={customStyle}>{children}</Label>;
}

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 5px;
`;

function FieldLabel({ children, customStyle }) {
  return <Label style={customStyle}>{children}</Label>;
}

export default FieldLabel

FieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.object,
};

FieldLabel.defaultProps = {
  customStyle: {}
}
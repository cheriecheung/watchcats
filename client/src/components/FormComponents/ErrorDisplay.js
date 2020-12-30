import React from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledErrorDisplay = styled.span`
  color: #E56E5A;
  align-self: flex-end;
  text-align: right;
  float: right;
`

function ErrorDisplay({ hidden, children }) {
  const { t } = useTranslation();

  return (
    <StyledErrorDisplay hidden={hidden}>
      {t(children)}
    </StyledErrorDisplay>
  )
}

export default ErrorDisplay;

ErrorDisplay.propTypes = {
  hidden: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};
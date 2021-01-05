import React from 'react';
import PropTypes from 'prop-types';
import { themeColor } from '../../../style/theme';
import styled from 'styled-components';

const Icon = styled.i`
  margin-bottom: 20px;
`

const Title = styled.h6`
  margin-top: 20px;
  color: ${themeColor.darkGrey};
  font-size: 1.4rem;
  font-weight: bold;
`

const Text = styled.h6`
  color: ${themeColor.grey};
  font-size: 1rem;
`

function ResponseDisplayTemplate({ icon, title, text }) {
  return (
    <>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      {text && <Text>{text}</Text>}
    </>
  )
}

export default ResponseDisplayTemplate;


ResponseDisplayTemplate.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.func.isRequired,
  text: PropTypes.node
};

ResponseDisplayTemplate.defaultProps = {
  text: undefined,
};
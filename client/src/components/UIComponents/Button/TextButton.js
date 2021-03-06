import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeColor } from '../../../style/theme'

const TextButton = styled.button`
  background: none;
  border: none;
  outline: none !important;
  transition: all 0.3s;
  color: ${({ colored }) => colored ? themeColor.peach : themeColor.grey};

  &:hover{
    color: ${themeColor.peach};
  }
`;

export default TextButton;

TextButton.propTypes = {
  colored: PropTypes.bool,
};

TextButton.defaultProps = {
  colored: undefined,
};
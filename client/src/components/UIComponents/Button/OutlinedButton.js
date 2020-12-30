import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themeColor } from '../../../style/theme'

const OutlinedButton = styled.button`
  padding: 5px 15px;
  height: 35px;
  color: ${({ color }) => color};
  background-color: #fff;
  border: 1px solid ${({ color }) => color};
  border-radius: 10px;
  outline: none !important;
`;

export default OutlinedButton;

OutlinedButton.propTypes = {
  color: PropTypes.string,
};

OutlinedButton.defaultProps = {
  color: themeColor.peach,
};
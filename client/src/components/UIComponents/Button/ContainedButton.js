import PropTypes from 'prop-types';
import { themeColor } from '../../../style/theme';
import styled from 'styled-components';

const ContainedButton = styled.button`
  margin: 5px 0;
  padding: 5px 25px;
  height: 35px;
  color: #fff;
  background-color: ${({ disabled }) => disabled ? themeColor.lightGrey : themeColor.peach};
  border: none;
  border-radius: 10px;
  outline: none !important;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'unset'};
  font-weight: 600;
`;

export default ContainedButton;

ContainedButton.propTypes = {
  disabled: PropTypes.bool
};

ContainedButton.defaultProps = {
  disabled: false
};
import styled from 'styled-components';
import { themeColor } from '../../../style/theme'

const OutlinedButton = styled.button`
  padding: 5px 15px;
  height: 35px;
  color: ${({ color }) => color ? color : themeColor.peach};
  background-color: #fff;
  border: 1px solid ${({ color }) => color ? color : themeColor.peach};
  border-radius: 10px;
  outline: none !important;
`;

export default OutlinedButton;

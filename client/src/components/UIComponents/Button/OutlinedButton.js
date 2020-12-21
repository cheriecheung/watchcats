import styled from 'styled-components';
import { themeColor } from '../../../style/theme'

const OutlinedButton = styled.button`
  border: 1px solid ${({ color }) => color ? color : themeColor.peach};
  border-radius: 10px;
  background-color: #fff;
  color: ${({ color }) => color ? color : themeColor.peach};
  outline: none !important;
  padding: 0 15px;
  height: 30px;
`;

export default OutlinedButton;

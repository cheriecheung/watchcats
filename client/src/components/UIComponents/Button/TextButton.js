import styled from 'styled-components';
import { themeColor } from '../../../style/theme'

const TextButton = styled.button`
  background: none;
  border: none;
  outline: none !important;
  transition: all 0.3s;

  &:hover{
    color: ${themeColor.peach}
  }
`;

export default TextButton;
import { themeColor } from '../../../style/theme';
import styled from 'styled-components';

const ContainedButton = styled.button`
  margin: 5px 0;
  padding: 5px 25px;
  height: 35px;
  color: #fff;
  background: ${themeColor.peach};
  border: none;
  border-radius: 10px;
  outline: none !important;
  font-weight: 600;
`;

export default ContainedButton;

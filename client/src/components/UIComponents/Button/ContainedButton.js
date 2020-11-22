import { themeColor } from '../../../style/theme';
import styled from 'styled-components';

const ContainedButton = styled.button`
  background: ${themeColor.peach};
  border: none;
  outline: none !important;
  padding: 5px 25px;
  border-radius: 15px;
  color: #fff;
  height: 35px;
  font-weight: 600;
  margin: 5px 0;
`;

export default ContainedButton;

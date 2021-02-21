import { themeColor } from '../../../style/theme';
import styled from 'styled-components';

type ContainedButtonProp = {
  disabled?: boolean,
  type?: string | undefined
}

const ContainedButton = styled.button<ContainedButtonProp>`
  margin: 5px 0;
  padding: 5px 25px;
  height: 35px;
  color: #fff;
  border: none;
  border-radius: 10px;
  outline: none !important;
  font-weight: 600;
  background-color: ${p => p.disabled ? themeColor.lightGrey : themeColor.peach};
  cursor: ${p => p.disabled ? 'not-allowed' : 'unset'};
`;

export default ContainedButton;
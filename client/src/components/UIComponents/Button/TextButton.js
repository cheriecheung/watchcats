import styled from 'styled-components';

const TextButton = styled.button`
  background: none;
  border: none;
  outline: none !important;
  transition: all 0.3s;

  &:hover{
    color: pink
  }
`;

export default TextButton;
import styled from 'styled-components';

const ButtonBordered = styled.button`
  border: 1px solid ${(props) => props.backgroundColor};
  border-radius: 15px;
  background-color: #fff;
  color: #494442;
  outline: none !important;
  padding: 0 15px;
  height: 30px;
  margin-right: 10px;
`;

export default ButtonBordered;

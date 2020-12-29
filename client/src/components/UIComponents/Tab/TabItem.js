import styled from 'styled-components';

const TabItem = styled.button`
  background-color: ${({ isSelected }) => isSelected ? '#ffa195' : '#fff'};
  color: ${({ isSelected }) => isSelected ? '#fff' : '#666'};
  font-weight: ${({ isSelected }) => isSelected ? 'bold' : 'normal'};
  height: 100%;
  border-radius: 10px;
  border: none;
  outline: none !important;
  padding: 0 15px;
`

export default TabItem
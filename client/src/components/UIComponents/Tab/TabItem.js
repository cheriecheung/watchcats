import styled from 'styled-components';

const TabItem = styled.button`
  background-color: ${props => props.isSelected ? '#ffa195' : '#fff'};
  color: ${props => props.isSelected ? '#fff' : '#666'};
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  height: 100%;
  border-radius: 40px;
  border: none;
  outline: none !important;
  padding: 0 15px;
`

export default TabItem
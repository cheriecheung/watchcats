import styled from 'styled-components';

const SubTabBarItem = styled.button`
  border: ${props => props.isSelected ? '2px solid #ffa195' : 'none'};  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  color: ${props => props.isSelected ? '#ffa195' : '#949292'};
  border-radius: 10px;
  outline: none !important;
  background: none;
  padding: 3px 10px 4px 10px;
  margin: 0 5px;
  white-space: nowrap;

  :first-child {
    margin-left: 15px;
  }

  :last-child{
    margin-right: 15px;
  }
`

export default SubTabBarItem
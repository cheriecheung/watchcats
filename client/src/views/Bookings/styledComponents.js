import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 0 auto;
  padding: 40px 0 50px 0;

  @media (max-width: 850px) {
    padding: 150px 50px 50px 50px;
    width: unset;
  }

  @media (max-width: 500px) {
    padding: 150px 4vw 50px 4vw;
  }
`

export const Field = styled.tr`
  display: flex;
`

export const FieldLabel = styled.td`
  width: 28%;
  margin-bottom: 0;
  font-weight: bold;

  text-overflow: ellipsis;
  white-space: nowrap;
`

export const FieldItem = styled.td`
  display: flex;
`

export const BrowseLink = styled(Link)`
  font-size: 25px;
  color: #ffa195;
`
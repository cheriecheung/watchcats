import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
`

export const BrowseLink = styled(Link)`
  font-size: 25px;
  color: #ffa195;
`
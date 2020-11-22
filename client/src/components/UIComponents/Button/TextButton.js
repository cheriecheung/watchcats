import React from 'react'
import styled, { css } from 'styled-components';
import { themeColor } from '../../../style/theme'
import { Link } from 'react-router-dom';

const sharedStyle = css`
  background: none;
  border: none;
  outline: none !important;

  &:hover{
    color: pink
  }
`

const DefaultTextButton = styled.button`
  ${sharedStyle}
`;

const LinkedTextButton = styled.a`
  color: ${themeColor.green};
  ${sharedStyle}
`

const RouterLinkTextButton = styled(Link)`
  background: none;
  border: none;
  outline: none;
  float: right !important;
`

function TextButton({ variant, link, type = "button", onClick, hidden, children }) {
  switch (variant) {
    case 'href':
      return <LinkedTextButton href={link} target="_blank">{children}</LinkedTextButton>
    case 'link':
      return <RouterLinkTextButton to={link}>{children}</RouterLinkTextButton>
    default:
      return <DefaultTextButton type={type} hidden={hidden} onClick={onClick}>{children}</DefaultTextButton>
  }
}

export default TextButton;
import React from 'react'
import styled, { css } from 'styled-components';
import { themeColor } from '../../../style/theme'

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

function TextButton({ variant, link, children }) {
  switch (variant) {
    case 'link':
      return <LinkedTextButton href={link} target="_blank">{children}</LinkedTextButton>
    default:
      return <DefaultTextButton>{children}</DefaultTextButton>
  }
}

export default TextButton;
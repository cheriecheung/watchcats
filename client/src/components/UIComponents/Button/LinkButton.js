import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { themeColor } from '../../../style/theme'

const defaultLinkButton = ({ variant }) => {
  if (!variant) return css`
    color: #666;
    background: none;
    border: none;
    outline: none;

    &:hover {
      color: ${themeColor.peach}
    }
  `

  return css``;
}

const bordered = ({ variant }) => {
  if (variant === 'bordered') return css`
    padding: 5px 15px;
    height: 35px;
    color: ${themeColor.peach};
    background: none;
    border: 1px solid ${themeColor.peach};
    border-radius: 10px;
    outline: none;

    &:hover {
      color: ${themeColor.peach}
    }
  `

  return css``;
}

const LinkButton = styled(Link)`
  ${defaultLinkButton}

  ${bordered}
`

export default LinkButton
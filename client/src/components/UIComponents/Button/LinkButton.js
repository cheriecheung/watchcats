import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { themeColor } from '../../../style/theme'

const defaultStyle = css`
  background: none;
  outline: none;

  &:hover {
    color: ${themeColor.peach}
  }
`

const defaultLinkButton = ({ variant }) => {
  if (!variant) return css`
    color: #666;
    border: none;
  `

  return css``;
}

const bordered = ({ variant }) => {
  if (variant === 'bordered') return css`
    padding: 5px 15px;
    height: 35px;
    color: ${themeColor.peach};
    border: 1px solid ${themeColor.peach};
    border-radius: 10px;
  `

  return css``;
}

const colored = ({ variant }) => {
  if (variant === 'colored') return css`
    color: ${themeColor.peach};
    border: none;
  `

  return css``;
}


const LinkButton = styled(Link)`
  ${defaultStyle}
  ${defaultLinkButton}

  ${bordered}
  ${colored}
`

export default LinkButton

LinkButton.propTypes = {
  variant: PropTypes.string
};

LinkButton.defaultProps = {
  variant: undefined
};
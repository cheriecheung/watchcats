import React from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'

const defaultStyle = css`
  margin-left: 15px;
  font-size: 18px;
  align-self: center;
  opacity: ${props => props.isShown ? 1 : 0};
`

const catInfo = props => {
  if (props.variant !== 'catInfo') return css``

  return `
    opacity: unset;
    display: ${props.isShown ? 'block' : 'none'}
  `
}

const Icon = styled.i`
  ${defaultStyle}
  ${catInfo}
`

function CheckedIcon({ isShown }) {
  return <Icon className="far fa-check-square" isShown={isShown} />
}

export default CheckedIcon

CheckedIcon.propTypes = {
  isShown: PropTypes.bool.isRequired
};
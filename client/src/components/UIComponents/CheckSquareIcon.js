import React from 'react'
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

function CheckSquareIcon({ isShown }) {
  return <Icon className="far fa-check-square" isShown={isShown} />
}

export default CheckSquareIcon
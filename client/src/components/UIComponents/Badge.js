import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Badge as AntBadge } from 'antd';
import { themeColor } from '../../style/theme'

const BadgeComponent = styled(AntBadge)`
  & > span {
    margin-top: -10px;
    background-color: ${({ isWhiteColor }) => isWhiteColor ? '#FFF' : themeColor.peach};
  }

  & > span::after {
    border: 1px solid ${({ isWhiteColor }) => isWhiteColor ? '#FFF' : themeColor.peach};
  }
`

function Badge({ children, isShown, isWhiteColor, style }) {

  return (
    <>
      {children}
      <BadgeComponent
        status="processing"
        style={{
          display: isShown ? 'inline-block' : 'none',
          paddingLeft: 5,
          ...style
        }}
        isWhiteColor={isWhiteColor}
      />
    </>
  )
}

export default Badge;

BadgeComponent.propTypes = {
  isWhiteColor: PropTypes.bool
}

BadgeComponent.defaultProps = {
  isWhiteColor: undefined
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  isShown: PropTypes.bool,
  isWhiteColor: PropTypes.bool
};

Badge.defaultProps = {
  isShown: undefined,
  isWhiteColor: undefined
};
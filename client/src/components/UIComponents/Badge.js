import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Badge as AntBadge } from 'antd';
import { themeColor } from '../../style/theme'

const BadgeComponent = styled(AntBadge)`
  & > span {
    margin-top: -10px;
    background-color: ${({ iswhitecolor }) => iswhitecolor ? '#FFF' : themeColor.peach};
  }

  & > span::after {
    border: 1px solid ${({ iswhitecolor }) => iswhitecolor ? '#FFF' : themeColor.peach};
  }
`

function Badge({ children, isShown, iswhitecolor, style }) {

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
        iswhitecolor={iswhitecolor}
      />
    </>
  )
}

export default Badge;

BadgeComponent.propTypes = {
  iswhitecolor: PropTypes.string
}

BadgeComponent.defaultProps = {
  iswhitecolor: undefined
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  isShown: PropTypes.bool,
  iswhitecolor: PropTypes.string
};

Badge.defaultProps = {
  isShown: undefined,
  iswhitecolor: undefined
};
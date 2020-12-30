import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Badge as AntBadge } from 'antd';
import { themeColor } from '../../style/theme'

const BadgeComponent = styled(AntBadge)`
  & > span {
    margin-top: -10px;
    background-color: ${themeColor.peach};
  }

  & > span::after {
    border: 1px solid ${themeColor.peach};
  }
`

function Badge({ children, unreadItems }) {
  const hasUnreadItems = unreadItems > 0

  return (
    <>
      {children}
      <BadgeComponent
        status="processing"
        style={{ display: hasUnreadItems ? 'inline-block' : 'none' }}
      />
    </>
  )
}

export default Badge;

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  unreadItems: PropTypes.number,
};

Badge.defaultProps = {
  unreadItems: undefined
};
import React from 'react'
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const defaultStyle = css`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 0;
  height: 40px;
  background: #fff;
  border: 4px solid #fff;
  border-radius: 50px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
`

const defaultTabBar = props => {
  if (!props.variant) return css`
    margin-bottom: 40px;
    overflow-x: scroll;

    ::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 680px) {
      width: 90vw;
      margin: 0 auto 40px auto; 
    }
  `;

  return css``;
};

const bookings = props => {
  if (props.variant !== 'bookings') return css``

  return ``
}

const TabBarComponent = styled.div`
  ${defaultStyle}

  ${defaultTabBar}
  ${bookings}
`

function TabBar({ variant, children }) {
  return <TabBarComponent variant={variant}>{children}</TabBarComponent>
}

export default TabBar

TabBar.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};
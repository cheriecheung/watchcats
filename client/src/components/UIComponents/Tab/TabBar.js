import React from 'react'
import styled from 'styled-components';

const DefaultTabBar = styled.div`
  display: inline-flex;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  height: 40px;
  margin-bottom: 40px;
  padding: 0;
  background: #fff;
  border-radius: 50px;
  border-left: 4px solid #fff;
  border-right: 4px solid #fff;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 680px) {
    width: 90vw;
    margin: 0 auto 40px auto; 
  }
`

const BookingsTabBar = styled.div`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 0;
  height: 40px;
  background: #fff;
  border-radius: 50px;
  border-left: 4px solid #fff;
  border-right: 4px solid #fff;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
`

function TabBar({ variant, children }) {
  switch (variant) {
    case 'bookings':
      return <BookingsTabBar>{children}</BookingsTabBar>
    default:
      return <DefaultTabBar>{children}</DefaultTabBar>
  }
}

export default TabBar
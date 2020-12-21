import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { themeColor } from '../../../style/theme';

const NavHeight = 7;

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  min-height: ${NavHeight}vh;
  align-items: center;
  background-color: #fff;
  border: none;
  box-shadow: 0 5px 5px rgba(182, 182, 182, 0.1);

  @media (max-width: 920px) {
    padding: 0 13px 0 10px;
  }
`;

export const AppLogo = styled.img`
  width: 30px;
  height: 30px;
`

export const AppName = styled.h4`
  color: ${themeColor.peach};
  font-family: Alata, sans-serif;
  margin-bottom: 0;
  white-space: nowrap;
  margin-right: 7px;

  @media (max-width: 920px) {
    display: none;
  }
`

export const HomeButton = styled(Link)`
  display: flex;
  background: none;
  border: none;
  outline: none;
`

export const MobileHeaderTitle = styled.h4`
  display: none;
  margin: 0;
  font-family: Alata, sans-serif;
  color: ${themeColor.peach};

  @media (max-width: 920px) {
    display: block;
  }
`

export const Menu = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;

  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 920px) {
    display: none;
  }
`;

export const Item = styled.li`
  margin: 0 10px;
`;

export const NavIcon = styled.button`
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
  outline: none !important;

  @media (min-width: 920px) {
    display: none;
  }
`;

export const Line = styled.span`
  display: block;
  margin: 5px;
  width: 20px;
  height: 2px;
  border-radius: 50px;
  background-color: ${themeColor.peach};
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.open ? 0 : '-80vw')};
  z-index: 5;
  width: 80vw;
  height: 100vh;
  background: #fff;
  transition: 0.4s ease-in-out;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (min-width: 920px) {
    display: none;
  }
`;

export const OverlayMask = styled.div`
  opacity: ${(props) => (props.open ? 1 : 0)};
  z-index: ${(props) => (props.open ? 1 : -1)};
  background-color: rgba(0, 0 ,0, 0.5);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  //transition: 0.4s ease-in-out;
`

export const OverlayMenu = styled.ul`
  padding: 20px 0 0 20px;
  transition: 0.4s ease-in-out;
  list-style: none;
  text-align: left;

  li {
    font-size: 15px;
    margin: 10px 0px;
  }

  li:nth-child(2) {
    margin: 10px 0px;
  }
  
`;

export const CloseButton = styled.button`
  position: relative;
  float: right;
  margin: 20px 10px 0 0;
  font-size: 10px;
  background: none;
  border: none;
  outline: none !important;
`

export const MenuItemBox = styled(Link)`
  display: flex;
  width: 70%;
  margin: 20px 0;
  font-size: 10px;
  color: ${themeColor.peach}
`

export const Icon = styled.i`
  align-self: center;
`

export const Label = styled.span`
  font-size: 1.1rem;
  margin-left: 25px;
`
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 920px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const LinkButton = styled(Link)`
  color: #9d9d9d;
  font-weight: 400;

  @media (max-width: 920px) {
    color: grey;
  }

  &:hover {
    color: ${themeColor.peach}
  }
`

export const LogoutButton = styled.button`
  color: #9d9d9d;
  font-weight: 400;
  outline: none !important;
  border: none;
  background: none;
  transition: all 0.3s;

  @media (max-width: 920px) {
    color: grey;
  }

  &:hover {
    color: ${themeColor.peach}
  }
`
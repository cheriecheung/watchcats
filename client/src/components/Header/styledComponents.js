import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { themeColor } from '../../style/theme';

const NavHeight = 7;

export const Nav = styled.nav`
  padding: 0 20px;
  min-height: ${NavHeight}vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: none;
  box-shadow: 0 5px 5px rgba(182, 182, 182, 0.1);

  @media (max-width: 768px) {
    padding: 0 5px;
    justify-content: center;
  }
`;

export const Menu = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;

  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Item = styled.li`
  margin: 0 10px;
`;

export const NavIcon = styled.button`
  position: absolute;
  left: 0;
  outline: none !important;
  background: none;
  cursor: pointer;
  border: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 20px;
  height: 2px;
  margin: 5px;
  background-color: ${themeColor.peach};
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${(props) => (props.open ? '40%' : '70%')};
  }
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

  @media (min-width: 769px) {
    display: none;
  }
`;

export const OverlayMask = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  background-color: rgba(0, 0 ,0, 0.3);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 1;
  transition: 0.4s ease-in-out;
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

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const LinkButton = styled(Link)`
  color: #9d9d9d;
  font-weight: 400;

  @media (max-width: 768px) {
    color: grey;
  }
`

export const LogoutButton = styled.button`
  color: #9d9d9d;
  font-weight: 400;
  outline: none;
  border: none;
  background: none;

  @media (max-width: 768px) {
    color: grey;
  }
`
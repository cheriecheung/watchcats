import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dutch from '../../assets/images/dutch.png';
import english from '../../assets/images/english.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authenticationActions';
import styled from 'styled-components';
import useLockBodyScroll from './use-lock-body-scroll';

import { themeColor } from '../../style/theme';
import { Badge } from 'antd';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const NavHeight = 7;

const Nav = styled.nav`
  padding: 0 20px;
  min-height: ${NavHeight}vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${themeColor.peach};

  @media (max-width: 768px) {
    padding: 0 5px;
    justify-content: center;
  }
`;

const Menu = styled.ul`
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

const Item = styled.li`
  margin: 0 10px;
`;

const NavIcon = styled.button`
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

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: #fff;
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${(props) => (props.open ? '40%' : '70%')};
  }
`;

const Overlay = styled.div`
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

const OverlayMask = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  background-color: rgba(0, 0 ,0, 0.3);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 1;
  transition: 0.4s ease-in-out;
`

const OverlayMenu = styled.ul`
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

const CloseButton = styled.button`
  position: relative;
  float: right;
  margin: 20px 10px 0 0;
  font-size: 10px;
  background: none;
  border: none;
  outline: none !important;
`

function Header() {
  const { t, i18n } = useTranslation();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, [i18n]);

  const setLanguage = (language) => {
    localStorage.setItem('lang', language);
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Nav>
        <NavIcon onClick={() => setToggle(!toggle)}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>

        <Link to="/" style={{ display: 'flex' }} onClick={() => setToggle(false)}>
          <h4
            style={{
              color: '#fff',
              fontFamily: 'Alata, sans-serif',
              marginBottom: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Watch Cats
          </h4>
        </Link>

        <Menu className="testing">
          <MenuContent setLanguage={setLanguage} />
        </Menu>
      </Nav>

      <Overlay open={toggle}>
        <CloseButton onClick={() => setToggle(false)}>
          <i className="fas fa-times fa-2x" />
        </CloseButton>
        <OverlayMenu open={toggle}>
          <MobileMenu setLanguage={setLanguage} closeMenu={() => setToggle(false)} />
          {/* <MenuContent setLanguage={setLanguage} closeMenu={() => setToggle(false)} /> */}
        </OverlayMenu>
      </Overlay>
      <OverlayMask open={toggle} />
    </>
  );
}

export default Header;

const MenuItemBox = styled(Link)`
  display: flex;
  width: 70%;
  margin: 20px 0;
  font-size: 10px;
`

const Icon = styled.i`
  align-self: center;
`

const Label = styled.span`
  font-size: 1.1rem;
  margin-left: 25px;
`

function MobileMenu({ setLanguage, closeMenu }) {
  const { isLoggedIn } = useSelector(state => state.isLoggedIn);
  const currentLanguage = localStorage.getItem('lang')
  const changeLanguage = currentLanguage === 'en' ? 'nl' : 'en'

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    closeMenu && closeMenu()
  };

  return (
    <>
      {isLoggedIn ?
        <>
          <h4 style={{ marginBottom: 30 }}>Cherie C</h4>
          <MenuItemBox to="/find" onClick={() => closeMenu && closeMenu()}>
            <Icon className="fas fa-search fa-2x" />
            <Label>Find Cat Sitter</Label>
          </MenuItemBox>
          <MenuItemBox to="/bookings" onClick={() => closeMenu && closeMenu()}>
            <Icon className="fas fa-calendar-minus fa-2x" />
            <Label>Bookings</Label>
          </MenuItemBox>
          <MenuItemBox to="/messages" onClick={() => closeMenu && closeMenu()}>
            <Icon className="fas fa-envelope fa-2x" />
            <Label>Messages</Label>
          </MenuItemBox>
          <MenuItemBox to={`/account/${cookies.get('shortId')}`} onClick={() => closeMenu && closeMenu()}>
            <Icon className="fas fa-user fa-2x" />
            <Label>Account</Label>
          </MenuItemBox>
          <MenuItemBox onClick={handleLogout}>
            <Icon className="fas fa-sign-out-alt fa-2x" />
            <Label>Log Out</Label>
          </MenuItemBox>
        </>
        :
        <>
          <MenuItemBox to="/login" onClick={() => closeMenu && closeMenu()}>
            <Icon className="fas fa-sign-in-alt fa-2x" />
            <Label>Log In</Label>
          </MenuItemBox>
        </>
      }


      <br /><br />

      <MenuItemBox to="/about" onClick={() => closeMenu && closeMenu()}>
        <Icon className="fas fa-info-circle fa-2x" />
        <Label>About</Label>
      </MenuItemBox>
      <MenuItemBox to="/" onClick={() => closeMenu && closeMenu()}>
        <Icon className="fas fa-home fa-2x" />
        <Label>Home</Label>
      </MenuItemBox>
      <MenuItemBox onClick={() => {
        closeMenu && closeMenu()
        setLanguage(changeLanguage)
      }}>
        <Icon className="fas fa-globe-americas fa-2x" />
        <Label>{currentLanguage === 'en' ? 'Nederlands' : 'English'}</Label>
      </MenuItemBox>
    </>
  )
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`

const LinkButton = styled(Link)`
  color: #fff;
  font-weight: 400;

  @media (max-width: 768px) {
    color: grey;
  }
`

const LogoutButton = styled.button`
  color: #fff;
  font-weight: 400;
  outline: none;
  border: none;
  background: none;

  @media (max-width: 768px) {
    color: grey;
  }
`

function MenuContent({ setLanguage, closeMenu }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu && closeMenu()
  };

  return (
    <>
      <ItemContainer>
        <Item>
          <LinkButton to="/find" onClick={() => closeMenu && closeMenu()}>
            {t('header.find_sitter')}
          </LinkButton>
        </Item>
        <Item>
          <LinkButton to="/about" onClick={() => closeMenu && closeMenu()}>
            {t('header.about')}
          </LinkButton>
        </Item>
      </ItemContainer>

      <ItemContainer>
        {isLoggedIn ? (
          <>
            <Item>
              <Badge size="small" count={5} offset={[10, 0]} overflowCount={10}>
                <LinkButton to="/bookings" onClick={() => closeMenu && closeMenu()}>
                  {t('header.bookings')}
                </LinkButton>
              </Badge>
            </Item>
            <Item>
              <LinkButton to="/messages" onClick={() => closeMenu && closeMenu()}>
                <i className="far fa-envelope" />
              </LinkButton>
            </Item>
            <Item>
              <LinkButton to={`/account/${cookies.get('shortId')}`} onClick={() => closeMenu && closeMenu()}>
                <i className="fas fa-user-circle" />
              </LinkButton>
            </Item>
            <Item>
              <LogoutButton type="button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt" />
              </LogoutButton>
            </Item>
          </>
        ) : (
            <Item>
              <LinkButton to="/login" onClick={() => closeMenu && closeMenu()}>
                {t('header.login')}
              </LinkButton>
            </Item>
          )}

        <Item>
          <button
            onClick={() => {
              closeMenu && closeMenu()
              setLanguage('en')
            }}
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              outline: 0,
              cursor: 'pointer',
              marginRight: 5,
            }}
          >
            <img src={english} width={20} />
          </button>
        </Item>

        <Item>
          <button
            onClick={() => {
              closeMenu && closeMenu()
              setLanguage('nl')
            }}
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              outline: 0,
              cursor: 'pointer',
            }}
          >
            <img src={dutch} width={20} />
          </button>
        </Item>
      </ItemContainer>
    </>
  )
}

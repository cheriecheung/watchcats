import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/purryful_logo.png';
import dutch from '../../assets/images/dutch.png';
import english from '../../assets/images/english.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { userlogout } from '../../_actions/userActions';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: #dbe6e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;

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
  outline: none;
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
  height: ${(props) => (props.open ? '91vh' : 0)};
  width: 100vw;
  background: #dbe6e0;
  transition: height 0.4s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul`
  padding: 0;
  list-style: none;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);

  li {
    opacity: ${(props) => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 50px 0px;
    transition: opacity 0.4s ease-in-out;
  }

  li:nth-child(2) {
    margin: 50px 0px;
  }
`;

function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [toggle, toggleNav] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, []);

  const setLanguage = (language) => {
    localStorage.setItem('lang', language);
    i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    dispatch(userlogout());
  };

  const menuItems = () => (
    <>
      <Item>
        <Link to="/find">{t('header.find_sitter')}</Link>
      </Item>
      <Item>
        <Link to="/find">{t('header.find_cat')}</Link>
      </Item>
      <Item>
        <Link to="/about">{t('header.about')}</Link>
      </Item>

      {cookies.get('sessionId') ? (
        <>
          <Item>
            <Link to="/login"> {t('header.profile')}</Link>
          </Item>
          <Item>
            <Link to="/login"> {t('header.logout')}</Link>
          </Item>
        </>
      ) : (
        <Item>
          <Link to="/login"> {t('header.login')}</Link>
        </Item>
      )}
      <Item>
        <button
          onClick={() => setLanguage('en')}
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
        <button
          onClick={() => setLanguage('nl')}
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
    </>
  );

  return (
    <>
      <Nav>
        <Link to="/">
          <img src={logo} width={150} />
        </Link>

        <Menu>{menuItems()}</Menu>
        <NavIcon onClick={() => toggleNav(!toggle)}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>
      </Nav>
      <Overlay open={toggle}>
        <OverlayMenu open={toggle}>{menuItems()}</OverlayMenu>
      </Overlay>
    </>
  );
}

export default Header;

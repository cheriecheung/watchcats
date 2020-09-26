import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dutch from '../../assets/images/dutch.png';
import english from '../../assets/images/english.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../_actions/userActions';
import styled from 'styled-components';
import { themeColor } from '../../style/theme';
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
  z-index: 5;
  position: absolute;
  height: ${(props) => (props.open ? '91vh' : 0)};
  width: 100vw;
  background: #f5f5f5;
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
  }, [i18n]);

  const setLanguage = (language) => {
    localStorage.setItem('lang', language);
    i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItemStyle = {
    color: '#fff',
    fontWeight: 400,
  };

  const menuItems = () => (
    <>
      <div style={{ display: 'flex' }}>
        <Item>
          <Link to="/find" style={menuItemStyle}>
            {t('header.find_sitter')}
          </Link>
        </Item>
        <Item>
          <Link to="/about" style={menuItemStyle}>
            {t('header.about')}
          </Link>
        </Item>
      </div>

      <div style={{ display: 'flex' }}>
        {cookies.get('userId') ? (
          <>
            <Item>
              <Link to="/bookings" style={menuItemStyle}>
                {t('header.bookings')}
              </Link>
            </Item>
            <Item>
              <Link to="/messages" style={menuItemStyle}>
                <i className="far fa-envelope" />
              </Link>
            </Item>
            <Item>
              <Link to={`/account/${cookies.get('shortId')}`} style={menuItemStyle}>
                <i className="fas fa-user-circle" />
              </Link>
            </Item>
            <Item>
              <Link to="/login" style={menuItemStyle}>
                <i className="fas fa-sign-out-alt" />
              </Link>
            </Item>
          </>
        ) : (
          <Item>
            <Link to="/login" style={menuItemStyle}>
              {t('header.login')}
            </Link>
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
      </div>
    </>
  );

  return (
    <>
      <Nav>
        <Link to="/" style={{ display: 'flex' }}>
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

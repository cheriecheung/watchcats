import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dutch from '../../assets/images/dutch.png';
import english from '../../assets/images/english.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import styled from 'styled-components';
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
  display: ${(props) => (props.open ? 'block' : 'none')};
  transition: opacity 0.4s ease-in-out;

  li {
    font-size: 15px;
    margin: 10px 0px;
  }

  li:nth-child(2) {
    margin: 10px 0px;
  }
`;

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
        <OverlayMenu open={toggle}>
          <MenuContent setLanguage={setLanguage} closeMenu={() => setToggle(false)} />
        </OverlayMenu>
      </Overlay>
    </>
  );
}

export default Header;

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
  const { isLoggedIn } = useSelector(state => state.is_logged_in);

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

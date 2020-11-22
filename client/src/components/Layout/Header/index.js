import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Nav,
  NavIcon,
  Line,
} from './styledComponents'

import { themeColor } from '../../../style/theme';
import { Desktop, Mobile } from './Type'
import { useHeader } from './viewModel';

function Header() {
  const {
    t,
    toggle,
    triggerToggle,
    setLanguage,
    isLoggedIn,
    onLogout,
    closeMenu,
    onMobileLogout
  } = useHeader();

  return (
    <>
      <Nav>
        <NavIcon onClick={triggerToggle}>
          <Line open={toggle} />
          <Line open={toggle} />
          <Line open={toggle} />
        </NavIcon>

        <Link to="/" style={{ display: 'flex' }} onClick={closeMenu}>
          <h4
            style={{
              color: themeColor.peach,
              fontFamily: 'Alata, sans-serif',
              marginBottom: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Watch Cats
          </h4>
        </Link>

        <Desktop
          t={t}
          setLanguage={setLanguage}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
        />
      </Nav>

      <Mobile
        t={t} toggle={toggle}
        setLanguage={setLanguage}
        isLoggedIn={isLoggedIn}
        closeMenu={closeMenu}
        onMobileLogout={onMobileLogout}
      />
    </>
  );
}

export default Header;

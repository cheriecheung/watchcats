import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Nav,
  NavIcon,
  Line,
} from './styledComponents'
import { LinkButton } from '../../UIComponents'

import { themeColor } from '../../../style/theme';
import Desktop from './containers/Desktop'
import Mobile from './containers/Mobile'

import { useHeader } from './viewModel';

function Header() {
  const {
    t,
    toggle,
    triggerToggle,
    setLanguage,
    currentLanguage,
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

        <LinkButton to="/" onClick={closeMenu}>
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
        </LinkButton>

        <Desktop
          t={t}
          setLanguage={setLanguage}
          currentLanguage={currentLanguage}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
        />
      </Nav>

      <Mobile
        t={t}
        toggle={toggle}
        setLanguage={setLanguage}
        currentLanguage={currentLanguage}
        isLoggedIn={isLoggedIn}
        closeMenu={closeMenu}
        onMobileLogout={onMobileLogout}
      />
    </>
  );
}

export default Header;

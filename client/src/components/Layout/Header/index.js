import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  AppLogo,
  AppName,
  HomeButton,
  MobileHeaderTitle,
  NavBar,
  NavIcon,
  Line,
} from './styledComponents'
import Logo from '../../../assets/images/logo.png'

import Desktop from './containers/Desktop'
import Mobile from './containers/Mobile'

import { useHeader } from './viewModel';

function Header() {
  const {
    t,
    toggle,
    triggerToggle,
    currentLanguage,
    setLanguage,
    renderPageTitle,
    isLoggedIn,
    onLogout,
    closeMenu,
    onMobileLogout,
    hasUnreadBookings,
    hasUnreadChats
  } = useHeader();

  return (
    <div style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
      <NavBar>
        <NavIcon onClick={triggerToggle}>
          <Line />
          <Line />
          <Line />
        </NavIcon>

        <MobileHeaderTitle>
          {renderPageTitle()}
        </MobileHeaderTitle>

        <HomeButton to="/" onClick={closeMenu}>
          <AppName toggle={toggle}>Watch Cats</AppName>
          <AppLogo src={Logo} alt="logo" />
        </HomeButton>

        <Desktop
          t={t}
          setLanguage={setLanguage}
          currentLanguage={currentLanguage}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          hasUnreadBookings={hasUnreadBookings}
          hasUnreadChats={hasUnreadChats}
        />
      </NavBar>

      <Mobile
        t={t}
        toggle={toggle}
        setLanguage={setLanguage}
        currentLanguage={currentLanguage}
        isLoggedIn={isLoggedIn}
        closeMenu={closeMenu}
        onMobileLogout={onMobileLogout}
        hasUnreadBookings={hasUnreadBookings}
        hasUnreadChats={hasUnreadChats}
      />
    </div>
  );
}

export default Header;

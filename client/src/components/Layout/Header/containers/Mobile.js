import React from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  OverlayMask,
  OverlayMenu,
  CloseButton,
  MenuItemBox,
  Icon,
  Label,
} from '../styledComponents'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Mobile({
  t,
  toggle,
  setLanguage,
  currentLanguage,
  isLoggedIn,
  closeMenu,
  onMobileLogout
}) {
  return (
    <>
      <Overlay open={toggle}>
        <CloseButton onClick={closeMenu}>
          <i className="fas fa-times fa-2x" />
        </CloseButton>

        <OverlayMenu open={toggle}>
          <MobileMenu
            setLanguage={setLanguage}
            currentLanguage={currentLanguage}
            isLoggedIn={isLoggedIn}
            closeMenu={closeMenu}
            onMobileLogout={onMobileLogout}
          />
        </OverlayMenu>
      </Overlay>

      <OverlayMask open={toggle} />
    </>
  )
}

export default Mobile;

function MobileMenu({
  setLanguage,
  currentLanguage,
  closeMenu,
  isLoggedIn,
  onMobileLogout
}) {
  // const currentLanguage = localStorage.getItem('lang')
  // const changeLanguage = currentLanguage === 'en' ? 'nl' : 'en'

  return (
    <>
      {isLoggedIn ?
        <>
          <h4 style={{ marginBottom: 30 }}>Cherie C</h4>
          <MenuItemBox to="/find" onClick={closeMenu}>
            <Icon className="fas fa-search fa-2x" />
            <Label>Find Cat Sitter</Label>
          </MenuItemBox>
          <MenuItemBox to="/bookings" onClick={closeMenu}>
            <Icon className="fas fa-calendar-minus fa-2x" />
            <Label>Bookings</Label>
          </MenuItemBox>
          <MenuItemBox to="/messages" onClick={closeMenu}>
            <Icon className="fas fa-envelope fa-2x" />
            <Label>Messages</Label>
          </MenuItemBox>
          <MenuItemBox to={`/account/${cookies.get('shortId')}`} onClick={closeMenu}>
            <Icon className="fas fa-user fa-2x" />
            <Label>Account</Label>
          </MenuItemBox>
          <MenuItemBox onClick={onMobileLogout}>
            <Icon className="fas fa-sign-out-alt fa-2x" />
            <Label>Log Out</Label>
          </MenuItemBox>
        </>
        :
        <>
          <MenuItemBox to="/login" onClick={closeMenu}>
            <Icon className="fas fa-sign-in-alt fa-2x" />
            <Label>Log In</Label>
          </MenuItemBox>
          <MenuItemBox to="/find" onClick={closeMenu}>
            <Icon className="fas fa-search fa-2x" />
            <Label>Find Cat Sitter</Label>
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
        setLanguage(currentLanguage === 'en' ? 'nl' : 'en')
      }}>
        <Icon className="fas fa-globe-americas fa-2x" />
        <Label>{currentLanguage === 'en' ? 'Nederlands' : 'English'}</Label>
      </MenuItemBox>
    </>
  )
}

Mobile.propTypes = {
  t: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  setLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
  onMobileLogout: PropTypes.func.isRequired,
};

MobileMenu.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
  onMobileLogout: PropTypes.func.isRequired,
};


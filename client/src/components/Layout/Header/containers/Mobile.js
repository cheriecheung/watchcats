import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '../../../UIComponents'
import {
  CloseButton,
  Icon,
  Label,
  Overlay,
  OverlayMask,
  OverlayMenu,
  MenuItemBox,
  TextButton,
} from '../styledComponents'

function Mobile({
  t,
  toggle,
  setLanguage,
  currentLanguage,
  isLoggedIn,
  closeMenu,
  onMobileLogout,
  hasUnreadBookings,
  hasUnreadChats
}) {
  return (
    <>
      <Overlay open={toggle}>
        <CloseButton onClick={closeMenu}>
          <i className="fas fa-times fa-2x" />
        </CloseButton>

        <OverlayMenu open={toggle}>
          <MobileMenu
            t={t}
            setLanguage={setLanguage}
            currentLanguage={currentLanguage}
            isLoggedIn={isLoggedIn}
            closeMenu={closeMenu}
            onMobileLogout={onMobileLogout}
            hasUnreadBookings={hasUnreadBookings}
            hasUnreadChats={hasUnreadChats}
          />
        </OverlayMenu>
      </Overlay>

      <OverlayMask open={toggle} />
    </>
  )
}

export default Mobile;

function MobileMenu({
  t,
  setLanguage,
  currentLanguage,
  closeMenu,
  isLoggedIn,
  onMobileLogout,
  hasUnreadBookings,
  hasUnreadChats
}) {
  const firstName = 'Cherie'

  return (
    <>
      {isLoggedIn ?
        <>
          <h5 style={{ marginBottom: 30, fontWeight: 'bold', color: '#666' }}>Welcome back, {firstName}!</h5>
          <MenuItemBox to="/find" onClick={closeMenu}>
            <Icon className="fas fa-search fa-2x" />
            <Label>{t('header.find_sitter')}</Label>
          </MenuItemBox>
          <MenuItemBox to="/bookings" onClick={closeMenu}>
            <Icon className="fas fa-calendar-minus fa-2x" />
            <Badge isShown={hasUnreadBookings}>
              <Label>{t('header.bookings')}</Label>
            </Badge>
          </MenuItemBox>
          <MenuItemBox to="/messages" onClick={closeMenu}>
            <Icon className="fas fa-envelope fa-2x" />
            <Badge isShown={hasUnreadChats}>
              <Label>{t('header.messages')}</Label>
            </Badge>
          </MenuItemBox>
          <MenuItemBox to="/account" onClick={closeMenu}>
            <Icon className="fas fa-user fa-2x" />
            <Label>{t('header.account')}</Label>
          </MenuItemBox>
          <TextButton onClick={onMobileLogout}>
            <Icon className="fas fa-sign-out-alt fa-2x" />
            <Label>{t('header.logout')}</Label>
          </TextButton>
        </>
        :
        <>
          <MenuItemBox to="/login" onClick={closeMenu}>
            <Icon className="fas fa-sign-in-alt fa-2x" />
            <Label>{t('header.login')}</Label>
          </MenuItemBox>
          <MenuItemBox to="/find" onClick={closeMenu}>
            <Icon className="fas fa-search fa-2x" />
            <Label>{t('header.find_sitter')}</Label>
          </MenuItemBox>
        </>
      }

      <br /><br />

      <MenuItemBox to="/about" onClick={() => closeMenu && closeMenu()}>
        <Icon className="fas fa-info-circle fa-2x" />
        <Label>{t('header.about')}</Label>
      </MenuItemBox>
      <MenuItemBox to="/" onClick={() => closeMenu && closeMenu()}>
        <Icon className="fas fa-home fa-2x" />
        <Label>{t('header.home')}</Label>
      </MenuItemBox>
      <TextButton onClick={() => {
        closeMenu && closeMenu()
        setLanguage(currentLanguage === 'en' ? 'nl' : 'en')
      }}>
        <Icon className="fas fa-globe-americas fa-2x" />
        <Label>{currentLanguage === 'en' ? 'NL' : 'EN'}</Label>
      </TextButton>
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


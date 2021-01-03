import React from 'react';
import PropTypes from 'prop-types';
import { Badge, TextButton } from '../../../UIComponents'
import {
  Menu,
  Icon,
  Item,
  ItemContainer,
  LinkButton,
  LogoutButton
} from '../styledComponents'

function Desktop({
  t,
  setLanguage,
  currentLanguage,
  isLoggedIn,
  onLogout,
  hasUnreadBookings,
  hasUnreadChats
}) {

  return (
    <Menu>
      <ItemContainer>
        <Item>
          <LinkButton to="/find">
            {t('header.find_sitter')}
          </LinkButton>
        </Item>
        <Item>
          <LinkButton to="/about">
            {t('header.about')}
          </LinkButton>
        </Item>
      </ItemContainer>

      <ItemContainer>
        {isLoggedIn ? (
          <>
            <Item>
              <Badge isShown={hasUnreadBookings}>
                <LinkButton to="/bookings">
                  {t('header.bookings')}
                </LinkButton>
              </Badge>
            </Item>
            <Item>
              <Badge isShown={hasUnreadChats}>
                <LinkButton to="/messages">
                  {t('header.messages')}
                </LinkButton>
              </Badge>
            </Item>
            <Item>
              <LinkButton to="/account">
                {t('header.account')}
              </LinkButton>
            </Item>
            <Item>
              <LogoutButton type="button" onClick={onLogout}>
                {t('header.logout')}
              </LogoutButton>
            </Item>
          </>
        ) : (
            <Item>
              <LinkButton to="/login">
                {t('header.login')}
              </LinkButton>
            </Item>
          )}

        <Item>
          <TextButton onClick={() => setLanguage(currentLanguage === 'en' ? 'nl' : 'en')}>
            <Icon className="fas fa-globe-americas" style={{ fontSize: 13, marginRight: 5 }} />
            <span>{currentLanguage === 'en' ? 'NL' : 'EN'}</span>
          </TextButton>
        </Item>
      </ItemContainer>
    </Menu>
  )
}

export default Desktop

Desktop.propTypes = {
  t: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};
import React from 'react';
import { TextButton } from '../../../UIComponents'
import {
  Menu,
  Icon,
  Item,
  ItemContainer,
  LinkButton,
  LogoutButton
} from '../styledComponents'
import { Badge } from 'antd';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Desktop({
  t,
  setLanguage,
  currentLanguage,
  isLoggedIn,
  onLogout
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
              <Badge size="small" count={5} offset={[10, 0]} overflowCount={10}>
                <LinkButton to="/bookings">
                  {t('header.bookings')}
                </LinkButton>
              </Badge>
            </Item>
            <Item>
              <LinkButton to="/messages">
                Messages
              </LinkButton>
            </Item>
            <Item>
              <LinkButton to={`/account/${cookies.get('shortId')}`}>
                Account
              </LinkButton>
            </Item>
            <Item>
              <LogoutButton type="button" onClick={onLogout}>
                Logout
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
            <span>{currentLanguage === 'en' ? 'Nederlands' : 'English'}</span>
          </TextButton>
        </Item>
      </ItemContainer>
    </Menu>
  )
}

export default Desktop;
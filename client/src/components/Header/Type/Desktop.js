import React from 'react';
import {
  Menu,
  Item,
  ItemContainer,
  LinkButton,
  LogoutButton
} from '../styledComponents'
import { Badge } from 'antd';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Desktop({ t, setLanguage, isLoggedIn, onLogout }) {
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
            EN
          </button>
        </Item>

        <Item>
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
            NL
          </button>
        </Item>
      </ItemContainer>
    </Menu>
  )
}

export default Desktop;
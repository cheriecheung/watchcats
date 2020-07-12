import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/purryful_logo.png';
import dutch from '../../assets/images/dutch.png';
import english from '../../assets/images/english.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { userActions } from '../../_actions';

function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, []);

  const setLanguage = (language) => {
    localStorage.setItem('lang', language);
    i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <div
      style={{
        padding: 100,
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Link to="/">
          <img src={logo} width={150} />
        </Link>

        <Link
          to="/find"
          style={{ textDecoration: 'none', marginLeft: 20, marginRight: 20 }}
        >
          {t('header.find_sitter')}
        </Link>
        <Link to="/find" style={{ textDecoration: 'none', marginRight: 20 }}>
          {t('header.find_cat')}
        </Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          {t('header.about')}
        </Link>
      </div>

      <div>
        {localStorage.getItem('user') ? (
          <>
            <Link
              to="/account"
              style={{ textDecoration: 'none', marginRight: 20 }}
            >
              Account
            </Link>

            <button
              type="button"
              style={{
                outline: 'none',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                marginLeft: 20,
                marginRight: 20,
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', marginRight: 20 }}>
            {t('header.login')}
          </Link>
        )}

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
      </div>
    </div>
  );
}

export default Header;

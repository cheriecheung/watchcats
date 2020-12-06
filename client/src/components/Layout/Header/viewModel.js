import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/authentication/actions';
import { changeLanguage, toggleMobileMenu } from '../../../redux/app/actions';

function useHeader() {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const { pathname } = location || {}

  const dispatch = useDispatch();
  const { language: currentLanguage, isLoggedIn } = useSelector(state => state.app);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    dispatch(changeLanguage(i18n, currentLanguage || 'en'))
  }, [i18n]);

  function setLanguage(language) {
    // localStorage.setItem('lang', language);
    // i18n.changeLanguage(language);
    dispatch(changeLanguage(i18n, language))
  };

  function triggerToggle() {
    setToggle(!toggle)
    dispatch(toggleMobileMenu(!toggle))
  }

  function renderPageTitle() {
    if (pathname.includes('/account')) {
      return t('header.account')
    }

    switch (pathname) {
      case '/about':
        return t('header.about')
      case '/find':
        return t('header.find_sitter')
      case '/bookings':
        return t('header.bookings')
      case '/account':
        return t('header.account')
      default:
        return 'Watch Cats'
    }
  }

  function closeMenu() {
    setToggle(false);
    dispatch(toggleMobileMenu(false))
  }

  function onLogout() {
    dispatch(logout());
  }

  function onMobileLogout() {
    dispatch(logout());
    setToggle(false);
  }

  return {
    t,
    toggle,
    triggerToggle,
    currentLanguage,
    setLanguage,
    renderPageTitle,
    isLoggedIn,
    onLogout,
    onMobileLogout,
    closeMenu
  }
}

export { useHeader }
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/authentication/actions';

function useHeader() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.authentication);

  const [toggle, setToggle] = useState(false);

  const currentLanguage = localStorage.getItem('lang')

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') || 'en');
  }, [i18n]);

  function setLanguage(language) {
    localStorage.setItem('lang', language);
    i18n.changeLanguage(language);
  };

  function triggerToggle() {
    setToggle(!toggle)
  }

  function closeMenu() {
    setToggle(false);
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
    isLoggedIn,
    onLogout,
    onMobileLogout,
    closeMenu
  }
}

export { useHeader }
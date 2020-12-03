import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/authentication/actions';
import { changeLanguage, toggleMobileMenu } from '../../../redux/app/actions';

function useHeader() {
  const { t, i18n } = useTranslation();

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
    isLoggedIn,
    onLogout,
    onMobileLogout,
    closeMenu
  }
}

export { useHeader }
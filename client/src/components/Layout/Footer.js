import React from "react";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { themeColor } from '../../style/theme';

function Footer() {
  const { t } = useTranslation();

  const location = useLocation();
  const { pathname } = location || {};

  const isChatPage = pathname.includes('messages');

  return (
    <footer style={{
      display: isChatPage ? 'none' : 'block',
      fontSize: '0.85rem',
      color: themeColor.grey,
      background: 'transparent',
      height: 'auto',
      margin: '5px 0 30px 0',
    }}>
      &#169; 2021 Watch Cats -&nbsp;
      {t('footer.made_with')}&nbsp;&#x2764;&nbsp;
      {t('footer.by')}&nbsp;
      <a
        href="https://github.com/cheriecheung" target="_blank"
        rel="noreferrer"
        style={{ color: themeColor.peach, fontSize: '0.85rem', fontWeight: 'bold' }}
      >
        Cherie Cheung
      </a>
    </footer>
  );
}

export default Footer;

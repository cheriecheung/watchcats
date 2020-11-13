import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ResponseModal from './ResponseModal';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Settings from './Settings';
import General from './General';
import CatSitterInfo from './CatSitterInfo';
import CatOwnerInfo from './CatOwnerInfo';

const Container = styled.div`
  text-align: left;
  margin: 5% 3% 3% 3%;
`;

const defaultTabStyle = {
  marginRight: 15,
  border: 'none',
  borderBottom: 'none',
  background: 'transparent',
  outline: 'none',
  color: '#666',
};

const selectedTabStyle = {
  ...defaultTabStyle,
  fontWeight: 'bold',
  color: '#ffa195',
  borderBottom: '2px solid #ffa195',
};

function Account() {
  const { accountTab } = useLocation().state || {};
  const defaultKey = accountTab || 'settings';

  // const pageRef = useRef(null);

  useEffect(() => {
    if (window.scrollTo) window.scrollTo(0, 0);

    // window.scrollTo(0, pageRef.current.offsetTop);
  }, []);

  console.log('tabs page')

  const { t } = useTranslation();
  const { screenWidth } = ScreenWidthListener();

  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    setActiveKey(defaultKey)
  }, [])

  const tabs = [
    { key: 'settings', tab: t('account.settings') },
    { key: 'general', tab: t('account.general_info') },
    { key: 'sitter', tab: t('account.sitter_profile') },
    { key: 'owner', tab: t('account.owner_profile') }
  ];

  const renderTabContent = () => {
    switch (activeKey) {
      case 'general':
        return <General />
      case 'sitter':
        return <CatSitterInfo />
      case 'owner':
        return <CatOwnerInfo />
      default:
        return <Settings />
    }
  }

  return (
    <div style={{ paddingTop: 30, maxWidth: 900, margin: '0 auto 50px auto' }}>
      <div>
        {tabs.map(({ key, tab }) =>
          <button
            key={key}
            style={activeKey === key ? selectedTabStyle : defaultTabStyle}
            onClick={() => setActiveKey(key)}
          >
            {tab}
          </button>
        )}
      </div>

      <div style={{ marginTop: 30 }}>
        {renderTabContent()}
      </div>

      <ResponseModal />
    </div>
  );
}

export default Account;
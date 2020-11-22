import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ResponseModal from './ResponseModal';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { TabBar, TabItem } from '../../components/UIComponents'

import Settings from './Settings';
import General from './General';
import CatSitterInfo from './CatSitterInfo';
import CatOwnerInfo from './CatOwnerInfo';

const Container = styled.div`
  margin: 0 4vw; 
  padding: 40px 0;
`;

const Content = styled.div`
  max-width: 800px;

  @media (max-width: 680px) {
    width: 90vw;
    margin: 0 auto; 
  }
`

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
    <Container style={{ color: ' #7f7f7f' }}>
      <TabBar>
        {tabs.map(({ key, tab }) =>
          <TabItem
            key={key}
            isSelected={activeKey === key}
            onClick={() => setActiveKey(key)}
          >
            {tab}
          </TabItem>
        )}
      </TabBar>

      <Content>
        {renderTabContent()}
      </Content>

      <ResponseModal />
    </Container>
  );
}

export default Account;
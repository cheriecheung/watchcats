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

const TabBar = styled.div`
  display: inline-flex;
  align-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  height: 40px;
  margin-bottom: 40px;
  padding: 0;
  background: #fff;
  border-radius: 50px;
  border-left: 4px solid #fff;
  border-right: 4px solid #fff;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 680px) {
    width: 90vw;
    margin: 0 auto 40px auto; 
  }
`

const TabItem = styled.button`
  background-color: ${props => props.isSelected ? '#ffa195' : '#fff'};
  color: ${props => props.isSelected ? '#fff' : '#666'};
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  height: 100%;
  border-radius: 40px;
  border: none;
  outline: none !important;
  padding: 0 15px;
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
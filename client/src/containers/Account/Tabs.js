import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GeneralInfo from './GeneralInfo';
import SitterProfile from './SitterProfile';
import OwnerProfile from './OwnerProfile';
import Settings from './Settings';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { useTranslation } from 'react-i18next';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 5% 3% 3% 3%;
`;

function ProfileTabs() {
  const { t } = useTranslation();
  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');

  const accountTabs = [
    { key: 'general', tab: t('account.general_info'), content: <GeneralInfo /> },
    { key: 'sitter', tab: t('account.sitter_profile'), content: <SitterProfile /> },
    { key: 'owner', tab: t('account.owner_profile'), content: <OwnerProfile /> },
    { key: 'settings', tab: t('account.settings'), content: <Settings /> },
  ];

  useEffect(() => {
    if (screenWidth <= 930) {
      setTabPosition('top');
    } else {
      setTabPosition('left');
    }
  }, [screenWidth]);

  return (
    <Tabs defaultActiveKey="owner" tabPosition={tabPosition} className="vertical-tabs">
      {accountTabs.map(({ key, tab, content }) => (
        <TabPane tab={tab} key={key}>
          <Container>{content}</Container>
        </TabPane>
      ))}
    </Tabs>
  );
}

// function Membership() {
//   return (
//     <div>
//       <h1>Membership</h1>
//     </div>
//   );
// }

export default ProfileTabs;

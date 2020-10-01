import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GeneralInfo from './GeneralInfo';
import SitterProfile from './SitterProfile';
import OwnerProfile from './OwnerProfile';
import Settings from './Settings';
import ResponseModal from './ResponseModal';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 5% 3% 3% 3%;
`;

function ProfileTabs() {
  const { accountTab } = useLocation().state || {};
  const defaultKey = accountTab || 'general';

  const { t } = useTranslation();
  const { screenWidth } = ScreenWidthListener();

  const [activeKey, setActiveKey] = useState(defaultKey);

  const accountTabs = [
    {
      key: 'general',
      tab: t('account.general_info'),
      content: <GeneralInfo activeKey={activeKey} />,
    },
    {
      key: 'sitter',
      tab: t('account.sitter_profile'),
      content: <SitterProfile activeKey={activeKey} />,
    },
    {
      key: 'owner',
      tab: t('account.owner_profile'),
      content: <OwnerProfile activeKey={activeKey} />,
    },
    { key: 'settings', tab: t('account.settings'), content: <Settings activeKey={activeKey} /> },
  ];

  return (
    <Tabs
      defaultActiveKey={defaultKey}
      tabPosition="top"
      onChange={(key) => setActiveKey(key)}
      style={{ marginTop: 10 }}
      centered
    >
      {accountTabs.map(({ key, tab, content }) => (
        <TabPane tab={tab} key={key}>
          <Container>{content}</Container>
        </TabPane>
      ))}

      <ResponseModal />
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

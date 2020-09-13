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

const defaultKey = 'owner';

function ProfileTabs() {
  const { t } = useTranslation();
  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');
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

  useEffect(() => {
    if (screenWidth <= 930) {
      setTabPosition('top');
    } else {
      setTabPosition('left');
    }
  }, [screenWidth]);

  return (
    <Tabs
      defaultActiveKey={defaultKey}
      tabPosition={tabPosition}
      className="vertical-tabs"
      onChange={(key) => setActiveKey(key)}
      style={{ marginTop: 10 }}
    >
      {accountTabs.map(({ key, tab, content }) => (
        <TabPane tab={tab} key={key} style={{ marginBottom: 50 }}>
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

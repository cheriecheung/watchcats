import React from 'react';
import styled from 'styled-components';
import GeneralInfo from './GeneralInfo';
import SitterProfile from './SitterProfile';
import OwnerProfile from './OwnerProfile';
import Settings from './Settings';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 50px 5%;
`;

function ProfileTabs() {
  const accountTabs = [
    { key: 'general', tab: 'General Info', content: <GeneralInfo /> },
    { key: 'sitter', tab: 'Cat sitter profile', content: <SitterProfile /> },
    { key: 'owner', tab: 'Cat owner profile', content: <OwnerProfile /> },
    { key: 'settings', tab: 'Settings', content: <Settings /> },
  ];

  return (
    <Tabs defaultActiveKey="sitter" tabPosition="left">
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

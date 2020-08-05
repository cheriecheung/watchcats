import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function ProfileTabs() {
  const [key, setKey] = useState('sitter');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="sitter" title="Cat sitter profile">
        <h1>Cat sitter profile</h1>
      </Tab>
      <Tab eventKey="owner" title="Cat owner profile">
        <h1>Cat owner profile</h1>
      </Tab>
      <Tab eventKey="membership" title="Membership">
        <h1>Membership</h1>
      </Tab>
      <Tab eventKey="settings" title="Settings">
        <h1>Settings</h1>
      </Tab>
    </Tabs>
  );
}

export default ProfileTabs;

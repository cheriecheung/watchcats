import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 0px 5%;
`;

const defaultKeyBookingStatus = 'request';

function SittingService({ changeBookingStatusTab, bookingStatusTabs }) {
  return (
    <Container>
      <Tabs
        defaultActiveKey={defaultKeyBookingStatus}
        onChange={changeBookingStatusTab}
        tabPosition="top"
        className="horizontal-tabs"
      >
        {bookingStatusTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </Container>
  );
}

export default SittingService;

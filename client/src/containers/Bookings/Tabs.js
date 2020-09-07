import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { sitterBookings } from '../../constants';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import Item from './Item';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 0px 5%;
`;

const cardHeight = 140;

function BookingTabs() {
  const { t } = useTranslation();
  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');

  const [activeKey, setActiveKey] = useState('sitter');
  const [bookings, setBookings] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(<h4>test</h4>);

  const { request = [], confirmed = [], completed = [], cancelled = [] } = bookings;

  const bookingTypeTabs = [
    {
      key: 'requested',
      tab: `${t('bookings.requested')} (${request.length})`,
      content: <Requested bookings={request} openModal={() => setModalVisible(true)} t={t} />,
    },
    {
      key: 'confirmed',
      tab: `${t('bookings.confirmed')} (${confirmed.length})`,
      content: <Confirmed bookings={confirmed} />,
    },
    {
      key: 'completed',
      tab: `${t('bookings.completed')} (${completed.length})`,
      content: <Completed bookings={completed} />,
    },
    {
      key: 'reviews',
      tab: `${t('bookings.cancelled')} (${cancelled.length})`,
      content: <Cancelled bookings={cancelled} />,
    },
  ];

  const bookingTabs = [
    {
      key: 'sitter',
      tab: t('bookings.sitting_jobs'),
      content: <SitterBookings bookingTypeTabs={bookingTypeTabs} />,
    },
    {
      key: 'owner',
      tab: t('bookings.sitting_service'),
      content: <OwnerBookings bookingTypeTabs={bookingTypeTabs} />,
    },
  ];

  const changeTab = (activeKey) => {
    setActiveKey(activeKey);
  };

  useEffect(() => {
    if (activeKey === 'sitter') {
      setBookings(sitterBookings);
    } else {
      const ownerBookings = {
        request: [{}, {}, {}],
        confirmed: [],
        completed: [{}],
        cancelled: [{}],
      };

      setBookings(ownerBookings);
    }
  }, [activeKey]);

  useEffect(() => {
    if (screenWidth <= 930) {
      setTabPosition('top');
    } else {
      setTabPosition('left');
    }
  }, [screenWidth]);

  return (
    <div style={{ display: 'flex', marginTop: 10 }}>
      <Tabs
        defaultActiveKey="sitter"
        tabPosition={tabPosition}
        onChange={changeTab}
        className="vertical-tabs"
      >
        {bookingTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>

      <Modal
        //title=""
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
export default BookingTabs;

function SitterBookings({ bookingTypeTabs }) {
  return (
    <Container>
      <Tabs defaultActiveKey="sitter" tabPosition="top" className="horizontal-tabs">
        {bookingTypeTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </Container>
  );
}

function OwnerBookings({ bookingTypeTabs }) {
  return (
    <Container>
      <Tabs defaultActiveKey="sitter" tabPosition="top" className="horizontal-tabs">
        {bookingTypeTabs.map(({ key, tab, content }) => (
          <TabPane tab={tab} key={key}>
            {content}
          </TabPane>
        ))}
      </Tabs>
    </Container>
  );
}

function Requested({ bookings, openModal, t }) {
  return (
    <>
      {bookings.map((data, index) => (
        <Item data={data} />
      ))}

      <br />
      <p>
        Remark: It is highly recommended to have a meet up session between you and cat owners before
        accepting their requests. Directly accepting a request is meant for owners you have
        previously completed bookings with.
      </p>
    </>
  );
}

function Confirmed({ bookings }) {
  return bookings.map((data, index) => <Item data={data} />);
}

function Completed({ bookings }) {
  return bookings.map((data, index) => <Item data={data} />);
}

function Cancelled({ bookings }) {
  return bookings.map((data, index) => <Item data={data} />);
}

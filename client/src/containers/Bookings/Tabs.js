import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { sitterBookings } from '../../constants';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { decline } from '../../_actions/bookingActions';
import { Cancelled, Completed, Confirmed, Requested } from './Type';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div`
  text-align: left;
  margin: 0px 5%;
`;

function BookingTabs() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');

  const [activeKey, setActiveKey] = useState('sitter');
  const [bookings, setBookings] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [confirmActionType, setConfirmActionType] = useState('');
  const [bookingId, setBookingId] = useState('');

  const { request = [], confirmed = [], completed = [], cancelled = [] } = bookings;

  const bookingTypeTabs = [
    {
      key: 'requested',
      tab: `${t('bookings.requested')} (${request.length})`,
      content: (
        <Requested
          bookings={request}
          openModal={() => setModalVisible(true)}
          setModalContent={(content) => setModalContent(content)}
          setConfirmActionType={(type) => setConfirmActionType(type)}
          setBookingId={(id) => setBookingId(id)}
          t={t}
        />
      ),
    },
    {
      key: 'confirmed',
      tab: `${t('bookings.confirmed')} (${confirmed.length})`,
      content: (
        <Confirmed
          bookings={confirmed}
          openModal={() => setModalVisible(true)}
          setModalContent={(content) => setModalContent(content)}
          t={t}
        />
      ),
    },
    {
      key: 'completed',
      tab: `${t('bookings.completed')} (${completed.length})`,
      content: (
        <Completed
          bookings={completed}
          openModal={() => setModalVisible(true)}
          setModalContent={(content) => setModalContent(content)}
          t={t}
        />
      ),
    },
    {
      key: 'reviews',
      tab: `${t('bookings.cancelled')} (${cancelled.length})`,
      content: <Cancelled bookings={cancelled} openModal={() => setModalVisible(true)} />,
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

  const performBookingAction = () => {
    switch (confirmActionType) {
      case 'decline':
        dispatch(decline(bookingId));
      default:
        break;
    }
  };

  useEffect(() => {
    console.log({ confirmActionType });
  }, [confirmActionType]);

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
        //  title=""
        visible={modalVisible}
        onOk={() => performBookingAction()}
        onCancel={() => setModalVisible(false)}
        maskClosable={false}
      >
        <br />
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

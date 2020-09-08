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

const ActionButton = styled.button`
  border: 1px solid ${(props) => props.backgroundColor};
  border-radius: 15px;
  background-color: #fff;
  color: #494442;
  outline: none !important;
  padding: 0 15px;
  height: 30px;
  margin-right: 10px;
`;

const cardHeight = 140;

function BookingTabs() {
  const { t } = useTranslation();
  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');

  const [activeKey, setActiveKey] = useState('sitter');
  const [bookings, setBookings] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [confirmAction, setConfirmAction] = useState('');

  const { request = [], confirmed = [], completed = [], cancelled = [] } = bookings;

  useEffect(() => {
    console.log({ modalContent });
  }, [modalContent]);

  const bookingTypeTabs = [
    {
      key: 'requested',
      tab: `${t('bookings.requested')} (${request.length})`,
      content: (
        <Requested
          bookings={request}
          openModal={() => setModalVisible(true)}
          setModalContent={(content) => setModalContent(content)}
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
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        maskClosable={false}
      >
        <br />
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

function Requested({ bookings, openModal, setModalContent, t }) {
  const renderActionButtons = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ActionButton
        backgroundColor="#FF5C4E"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.decline_confirm'));
        }}
      >
        {t('bookings.decline')}
      </ActionButton>
      <ActionButton
        backgroundColor="#FFAE42"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.schedule_meetup_confirm'));
        }}
      >
        {t('bookings.schedule_meetup')}
      </ActionButton>
      <ActionButton
        backgroundColor="#9ACD32"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.accept_confirm'));
        }}
      >
        {t('bookings.accept')}
      </ActionButton>
    </div>
  );

  return (
    <>
      {bookings.map((data, index) => (
        <Item data={data} renderActionButtons={renderActionButtons} />
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

function Confirmed({ bookings, openModal, setModalContent, t }) {
  const renderActionButtons = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ActionButton
        backgroundColor="#FF5C4E"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.cancel_confirm'));
        }}
      >
        {t('bookings.cancel')}
      </ActionButton>
      <ActionButton
        backgroundColor="#9ACD32"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.complete_confirm'));
        }}
      >
        {t('bookings.complete')}
      </ActionButton>
    </div>
  );

  return bookings.map((data, index) => (
    <Item data={data} openModal={openModal} renderActionButtons={renderActionButtons} />
  ));
}

function Completed({ bookings, openModal, setModalContent, t }) {
  const renderActionButtons = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ActionButton
        backgroundColor="#FF5C4E"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.cancel_confirm'));
        }}
      >
        {t('bookings.write_review')}
      </ActionButton>
    </div>
  );

  return bookings.map((data, index) => (
    <Item data={data} openModal={openModal} renderActionButtons={renderActionButtons} />
  ));
}

function Cancelled({ bookings, openModal }) {
  return bookings.map((data, index) => <Item data={data} openModal={openModal} />);
}

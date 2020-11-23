import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Requested, Confirmed, Completed, Declined } from './Status';
import { useBookings } from './viewModel'
import { Modal, SubTabBar, SubTabBarItem, TabBar, TabItem } from '../../components/UIComponents'
import styled from 'styled-components';

const Content = styled.div`
  max-width: 800px;

  @media (max-width: 680px) {
    width: 90vw;
    margin: 0 auto; 
  }
`

function Bookings() {
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const {
    bookings,
    bookingTypeActiveKey,
    setBookingTypeActiveKey,
    bookingStatusActiveKey,
    setBookingStatusActiveKey,
    setBookingId,
    setActionType,
    submitAction
  } = useBookings();

  const { requested, confirmed, completed, declined } = bookings || {}

  const bookingTypeTabs = [
    { key: 'sitting_jobs', tab: t('bookings.as_cat_sitter') },
    { key: 'sitting_service', tab: t('bookings.as_cat_owner') },
  ];

  const bookingStatusTabs = [
    { key: 'requested', tab: `${t('bookings.requested')} (${requested.length})` },
    { key: 'confirmed', tab: `${t('bookings.confirmed')}  (${confirmed.length})` },
    { key: 'completed', tab: `${t('bookings.completed')}  (${completed.length})` },
    { key: 'declined', tab: `${t('bookings.declined')}  (${declined.length})` },
  ]

  const renderBookingStatusTabContent = () => {
    switch (bookingStatusActiveKey) {
      case 'confirmed':
        return (
          <Confirmed
            bookingType={bookingTypeActiveKey}
            bookings={confirmed}
            openModal={() => setModalVisible(true)}
            setModalContent={(content) => setModalContent(content)}
            setBookingId={(id) => setBookingId(id)}
            setActionType={(type) => setActionType(type)}
          />
        )
      case 'completed':
        return (
          <Completed
            bookingType={bookingTypeActiveKey}
            bookings={completed}
          />
        )
      case 'declined':
        return (
          <Declined
            bookings={declined}
          />
        )
      default:
        return (
          <Requested
            bookingType={bookingTypeActiveKey}
            bookings={requested}
            openModal={() => setModalVisible(true)}
            setModalContent={(content) => setModalContent(content)}
            setBookingId={(id) => setBookingId(id)}
            setActionType={(type) => setActionType(type)}
          />
        )
    }
  }

  return (
    <>
      <div style={{ padding: '40px 0 5px 0' }}>
        <TabBar variant="bookings">
          {bookingTypeTabs.map(({ key, tab }) =>
            <TabItem
              key={key}
              isSelected={bookingTypeActiveKey === key}
              onClick={() => setBookingTypeActiveKey(key)}
            >
              {tab}
            </TabItem>
          )}
        </TabBar>

        <SubTabBar>
          {bookingStatusTabs.map(({ key, tab }) =>
            <SubTabBarItem
              key={key}
              isSelected={bookingStatusActiveKey === key}
              onClick={() => setBookingStatusActiveKey(key)}
            >
              {tab}
            </SubTabBarItem>
          )}
        </SubTabBar>
      </div>

      <Content>
        {renderBookingStatusTabContent()}
      </Content>

      <Modal
        visible={modalVisible}
        onOk={submitAction}
        onCancel={() => setModalVisible(false)}
        maskClosable={false}
      >
        <br />
        {modalContent}
      </Modal>
    </>
  );
}

export default Bookings;
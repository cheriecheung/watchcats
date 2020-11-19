import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Requested, Confirmed, Completed, Declined } from './Status';
import { useBookings } from './viewModel'

const Container = styled.div` 
  text-align: left;
  margin: 0px 5%;
`;

const defaultTabStyle = {
  marginRight: 10,
  border: 'none',
  borderBottom: 'none',
  background: 'transparent',
  outline: 'none',
  color: '#666',
};

const selectedTabStyle = {
  ...defaultTabStyle,
  fontWeight: 'bold',
  color: '#ffa195',
  borderBottom: '2px solid #ffa195',
};

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
    { key: 'sitting_jobs', tab: t('bookings.sitting_jobs') },
    { key: 'sitting_service', tab: t('bookings.sitting_service') },
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
    <div style={{ maxWidth: 900, margin: '30px auto 50px auto' }}>
      <div>
        {bookingTypeTabs.map(({ key, tab }) =>
          <button
            key={key}
            style={bookingTypeActiveKey === key ? selectedTabStyle : defaultTabStyle}
            onClick={() => setBookingTypeActiveKey(key)}
          >
            {tab}
          </button>
        )}
      </div>

      <div style={{ marginTop: 25 }}>
        {bookingStatusTabs.map(({ key, tab }) =>
          <button
            key={key}
            style={bookingStatusActiveKey === key ? selectedTabStyle : defaultTabStyle}
            onClick={() => setBookingStatusActiveKey(key)}
          >
            {tab}
          </button>
        )}
      </div>

      <div style={{ marginTop: 25 }}>
        {renderBookingStatusTabContent()}
      </div>

      <Modal
        visible={modalVisible}
        onOk={submitAction}
        onCancel={() => setModalVisible(false)}
        maskClosable={false}
      >
        <br />
        {modalContent}
      </Modal>
    </div>
  );
}

export default Bookings;
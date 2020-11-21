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

const BookingTypeToggle = styled.div`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 0;
  height: 40px;
  background: #fff;
  border-radius: 50px;
  border-left: 4px solid #fff;
  border-right: 4px solid #fff;
  border-top: 4px solid #fff;
  border-bottom: 4px solid #fff;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
`

const TypeItem = styled.button`
  background-color: ${props => props.isSelected ? '#ffa195' : '#fff'};
  color: ${props => props.isSelected ? '#fff' : '#666'};
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  height: 100%;
  border-radius: 40px;
  border: none;
  outline: none !important;
  padding: 0 15px;
`

const BookingStatusTabs = styled.div`
  width: 100vw;
  height: 50px;
  overflow-x: scroll;
  margin-top: 25px;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`

const StatusItem = styled.button`
  border: ${props => props.isSelected ? '2px solid #ffa195' : 'none'};  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  color: ${props => props.isSelected ? '#ffa195' : '#949292'};
  border-radius: 40px;
  outline: none !important;
  background: none;
  padding: 3px 10px 4px 10px;
  margin: 0 5px;
  white-space: nowrap;

  :first-child {
    margin-left: 15px;
  }

  :last-child{
    margin-right: 15px;
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
    <>
      <div style={{ padding: '40px 0 5px 0' }}>
        <BookingTypeToggle>
          <TypeItem
            style={{ marginRight: 5 }}
            onClick={() => setBookingTypeActiveKey('sitting_jobs')}
            isSelected={bookingTypeActiveKey === 'sitting_jobs'}
          >
            {t('bookings.as_cat_sitter')}
          </TypeItem>
          <TypeItem
            onClick={() => setBookingTypeActiveKey('sitting_service')}
            isSelected={bookingTypeActiveKey === 'sitting_service'}
          >
            {t('bookings.as_cat_owner')}
          </TypeItem>
        </BookingTypeToggle>

        <BookingStatusTabs>
          {bookingStatusTabs.map(({ key, tab }) =>
            <StatusItem
              key={key}
              isSelected={bookingStatusActiveKey === key}
              onClick={() => setBookingStatusActiveKey(key)}
            >
              {tab}
            </StatusItem>
          )}
        </BookingStatusTabs>
      </div>

      <div style={{ margin: '4vw' }}>
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
    </>
  );
}

export default Bookings;
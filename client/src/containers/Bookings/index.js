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
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
  background: #fff;
  display: inline-flex;
  align-items: center;
  padding: 0 5px;
  height: 40px;
  border-radius: 50px;
  
  @media (min-width: 769px) {
    margin-top: -20px;
  }
`

const TypeItem = styled.button`
  background-color: ${props => props.isSelected ? '#ffa195' : '#fff'};
  color: ${props => props.isSelected ? '#fff' : '#666'};
  height: 80%;
  border-radius: 40px;
  border: none;
  outline: none !important;
  font-weight: bold;
  padding: 0 15px;
`

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

// const BookingStatusTabs = styled.div`
//   width: 90vw;
//   height: 40px;
//   overflow-x: scroll;
//   margin-top: 15px;
//   white-space: nowrap;
//   box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05);
//   background: #fff;
//   display: inline-flex;
//   align-items: center;
//   padding: 0 5px;
//   border-radius: 50px;

//   ::-webkit-scrollbar {
//     display: none;
//   }
// `

// const StatusItem = styled.button`
//   border: ${props => props.isSelected ? '2px solid #ffa195' : 'none'};
//   border-radius: 40px;
//   color: ${props => props.isSelected ? '#ffa195' : '#c4c4c4'};
//   outline: none !important;
//   font-weight: bold;
//   background: none;
//   padding: 3px 10px 4px 10px;
//   margin: 0 5px;
//   white-space: nowrap;

//   :first-child {
//     margin-left: 1px;
//   }

//   :last-child{
//     margin-right: 1px;
//   }
// `

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
  border: ${props => props.isSelected ? '2px solid #ffa195' : 'none'};
  border-radius: 40px;
  color: ${props => props.isSelected ? '#ffa195' : '#949292'};
  outline: none !important;
  font-weight: bold;
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
      <div style={{
        // background: '#fff',
        //padding: '20px 0 5px 0',
        //boxShadow: '0 5px 5px rgba(182, 182, 182, 0.1)'
        padding: '40px 0 5px 0',
      }}>
        <BookingTypeToggle>
          <TypeItem
            style={{ marginRight: 5 }}
            onClick={() => setBookingTypeActiveKey('sitting_jobs')}
            isSelected={bookingTypeActiveKey === 'sitting_jobs'}
          >
            As a cat sitter
        </TypeItem>
          <TypeItem
            onClick={() => setBookingTypeActiveKey('sitting_service')}
            isSelected={bookingTypeActiveKey === 'sitting_service'}
          >
            As a cat owner
        </TypeItem>
        </BookingTypeToggle>

        {/* <div style={{ margin: '0 5vw' }}> */}
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
        {/* </div> */}
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
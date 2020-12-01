import React from 'react';
import { Modal, SubTabBar, SubTabBarItem, TabBar, TabItem } from '../../components/UIComponents'
import styled from 'styled-components';

import Requested from './containers/Requested'
import Confirmed from './containers/Confirmed'
import Completed from './containers/Completed'
import Declined from './containers/Declined'

import { useBookings } from './viewModel'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto; 

  @media (max-width: 680px) {
    width: 90vw;
  }
`

function Bookings() {
  const {
    t,
    bookings,
    bookingTypeActiveKey,
    setBookingTypeActiveKey,
    bookingStatusActiveKey,
    setBookingStatusActiveKey,
    setBookingId,
    setActionType,
    submitAction,
    bookingTypeTabs,
    bookingStatusTabs,
    modalVisible,
    setModalVisible,
    modalContent,
    setModalContent,
  } = useBookings();

  const { requested, confirmed, completed, declined } = bookings || {}

  const renderBookingStatusTabContent = () => {
    switch (bookingStatusActiveKey) {
      case 'confirmed':
        return (
          <Confirmed
            t={t}
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
            t={t}
            bookingType={bookingTypeActiveKey}
            bookings={completed}
          />
        )
      case 'declined':
        return (
          <Declined
            t={t}
            bookings={declined}
          />
        )
      default:
        return (
          <Requested
            t={t}
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
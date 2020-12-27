import React from 'react';
import {
  ContainedButton,
  Modal,
  Spinner,
  SubTabBar,
  SubTabBarItem,
  TabBar,
  TabItem,
  TextButton
} from '../../components/UIComponents'
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
    submitAction,
    bookingTypeTabs,
    bookingStatusTabs,
    modalVisible,
    setModalVisible,
    modalContent,
    onHandleRequestedBooking,
    onCompleteBooking,
    isLoadingFulfillAction,
    isLoadingBookingRecords
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
            onCompleteBooking={onCompleteBooking}
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
            bookingType={bookingTypeActiveKey}
            bookings={declined}
          />
        )
      default:
        return (
          <Requested
            t={t}
            bookingType={bookingTypeActiveKey}
            bookings={requested}
            onHandleRequestedBooking={onHandleRequestedBooking}
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
        {/* {isLoadingBookingRecords ?
          <Spinner /> :
          renderBookingStatusTabContent()
        } */}
      </Content>

      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={null}
        maskClosable={false}
      >
        <br />
        {modalContent}
        <br />
        <br />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextButton
            style={{ marginRight: 15 }}
            onClick={() => setModalVisible(false)}
          >
            {t('form.cancel')}
          </TextButton>

          <ContainedButton onClick={submitAction}>
            {t('form.ok')}
            {isLoadingFulfillAction && <Spinner />}
          </ContainedButton>
        </div>
      </Modal>
    </>
  );
}

export default Bookings;
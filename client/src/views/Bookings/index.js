import React from 'react';
import {
  Badge,
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
  margin: 0 auto 20px auto; 

  @media (max-width: 680px) {
    width: 90vw;
  }
`

function Bookings() {
  const {
    t,
    bookings,
    notifications,
    bookingTypeActiveKey,
    setBookingTypeActiveKey,
    bookingStatusActiveKey,
    setBookingStatusActiveKey,
    submitAction,
    bookingStatusTabs,
    modalVisible,
    setModalVisible,
    modalContent,
    onHandleRequestedBooking,
    onCompleteBooking,
    isLoadingFulfillAction,
    isLoadingBookingRecords
  } = useBookings();

  const renderBookingStatusTabContent = () => {
    switch (bookingStatusActiveKey) {
      case 'confirmed':
        return (
          <Confirmed
            t={t}
            bookingType={bookingTypeActiveKey}
            bookings={bookings}
            onCompleteBooking={onCompleteBooking}
          />
        )
      case 'completed':
        return (
          <Completed
            t={t}
            bookingType={bookingTypeActiveKey}
            bookings={bookings}
          />
        )
      case 'declined':
        return (
          <Declined
            t={t}
            bookingType={bookingTypeActiveKey}
            bookings={bookings}
          />
        )
      default:
        return (
          <Requested
            t={t}
            bookingType={bookingTypeActiveKey}
            bookings={bookings}
            onHandleRequestedBooking={onHandleRequestedBooking}
          />
        )
    }
  }

  const { unreadBookingsAsOwner = {}, unreadBookingsAsSitter = {} } = notifications || {};

  // console.log({ unreadBookingsAsOwner, unreadBookingsAsSitter })

  const hasUnreadAsOwner = Object.entries(unreadBookingsAsOwner).length > 0;
  const hasUnreadAsSitter = Object.entries(unreadBookingsAsSitter).length > 0;
  const sittingJobsSelected = bookingTypeActiveKey === 'sitting_jobs'
  const sittingServiceSelected = bookingTypeActiveKey === 'sitting_service'

  return (
    <>
      <div style={{ padding: '40px 0 5px 0' }}>
        <TabBar variant="bookings">
          <TabItem
            isSelected={sittingJobsSelected}
            onClick={() => setBookingTypeActiveKey('sitting_jobs')}
          >
            <Badge
              isShown={hasUnreadAsSitter}
              isWhiteColor={sittingJobsSelected}
            >
              {t('bookings.as_cat_sitter')}
            </Badge>
          </TabItem>
          <TabItem
            isSelected={sittingServiceSelected}
            onClick={() => setBookingTypeActiveKey('sitting_service')}
          >
            <Badge
              isShown={hasUnreadAsOwner}
              isWhiteColor={sittingServiceSelected}
            >
              {t('bookings.as_cat_owner')}
            </Badge>
          </TabItem>
        </TabBar>

        <SubTabBar>
          {bookingStatusTabs.map(({ key, tab }) => {
            const type = sittingJobsSelected ? unreadBookingsAsSitter : unreadBookingsAsOwner

            return (
              <SubTabBarItem
                key={key}
                isSelected={bookingStatusActiveKey === key}
                onClick={() => setBookingStatusActiveKey(key)}
              >
                <Badge isShown={type[key]}>
                  {tab}
                </Badge>
              </SubTabBarItem>
            )
          })}
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
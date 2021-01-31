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
    statusTabs,

    clickedType,
    setClickedType,
    clickedStatus,
    setClickedStatus,

    modalVisible,
    setModalVisible,
    modalContent,

    isLoadingBookings,
    isLoadingFulfillAction,
    onHandleRequestedBooking,
    onCompleteBooking,
    submitAction
  } = useBookings();

  const renderBookingStatusTabContent = () => {
    switch (clickedStatus) {
      case 'confirmed':
        return (
          <Confirmed
            t={t}
            bookingType={clickedType}
            bookings={bookings}
            onCompleteBooking={onCompleteBooking}
          />
        )
      case 'completed':
        return (
          <Completed
            t={t}
            bookingType={clickedType}
            bookings={bookings}
          />
        )
      case 'declined':
        return (
          <Declined
            t={t}
            bookingType={clickedType}
            bookings={bookings}
          />
        )
      default:
        return (
          <Requested
            t={t}
            bookingType={clickedType}
            bookings={bookings}
            onHandleRequestedBooking={onHandleRequestedBooking}
          />
        )
    }
  }

  const { unreadBookingsAsOwner = {}, unreadBookingsAsSitter = {} } = notifications || {};

  const hasUnreadAsOwner = Object.entries(unreadBookingsAsOwner).length > 0;
  const hasUnreadAsSitter = Object.entries(unreadBookingsAsSitter).length > 0;
  const sittingJobsSelected = clickedType === 'sitting_jobs'
  const sittingServiceSelected = clickedType === 'sitting_service'

  return (
    <>
      <div style={{ padding: '40px 0 5px 0' }}>
        <TabBar variant="bookings">
          <TabItem
            isSelected={sittingJobsSelected}
            onClick={() => setClickedType('sitting_jobs')}
          >
            <Badge
              isShown={hasUnreadAsSitter}
              iswhitecolor={sittingJobsSelected.toString()}
            >
              {t('bookings.as_cat_sitter')}
            </Badge>
          </TabItem>
          <TabItem
            isSelected={sittingServiceSelected}
            onClick={() => setClickedType('sitting_service')}
          >
            <Badge
              isShown={hasUnreadAsOwner}
              iswhitecolor={sittingServiceSelected.toString()}
            >
              {t('bookings.as_cat_owner')}
            </Badge>
          </TabItem>
        </TabBar>

        <SubTabBar>
          {statusTabs.map(({ key, tab }) => {
            const type = sittingJobsSelected ? unreadBookingsAsSitter : unreadBookingsAsOwner

            return (
              <SubTabBarItem
                key={key}
                isSelected={clickedStatus === key}
                onClick={() => setClickedStatus(key)}
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
        {isLoadingBookings ?
          <Spinner colored={true.toString()} style={{ margin: '30px 0' }} /> :
          renderBookingStatusTabContent()
        }
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
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { sitterBookings } from '../../constants';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getRecords, fulfillAction } from '../../redux/actions/bookingActions';
import { SittingJobs, SittingService } from './Types';
import { Requested, Confirmed, Completed, Declined } from './Status';
import { Spin, Tabs } from 'antd';
const { TabPane } = Tabs;

const Container = styled.div` 
  text-align: left;
  margin: 0px 5%;
`;

const defaultKeyBookingType = 'sitting_jobs';
const defaultKeyBookingStatus = 'requested';

function BookingTabs() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: ownerData } = useSelector((state) => state.account);
  const { bookings: returnedBookings } = useSelector((state) => state.bookings);

  const { screenWidth } = ScreenWidthListener();

  const [bookingTypeActiveKey, setBookingTypeActiveKey] = useState(defaultKeyBookingType);
  const [bookingStatusActiveKey, setBookingStatusActiveKey] = useState(defaultKeyBookingStatus);
  const [bookings, setBookings] = useState({ requested: [], confirmed: [], completed: [], declined: [] })

  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [actionType, setActionType] = useState('');
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    setLoading(false)
    if (returnedBookings) {
      setBookings(returnedBookings)
    }
  }, [returnedBookings]);

  useEffect(() => {
    setLoading(true)

    if (bookingTypeActiveKey === 'sitting_jobs') {
      dispatch(getRecords('jobs'));
    } else {
      dispatch(getRecords('services'));
    }
  }, [bookingTypeActiveKey]);

  const changeBookingTypeTab = (key) => {
    setBookingTypeActiveKey(key);
  };

  const changeBookingStatusTab = (key) => {
    setBookingStatusActiveKey(key);
  };

  const { requested, confirmed, completed, declined } = bookings || {}

  const bookingStatusTabs = [
    {
      key: 'requested',
      tab: `${t('bookings.requested')} (${requested.length})`,
      content: (
        <Requested
          bookingType={bookingTypeActiveKey}
          bookings={requested}
          openModal={() => setModalVisible(true)}
          setModalContent={(content) => setModalContent(content)}
          setBookingId={(id) => setBookingId(id)}
          setActionType={(type) => setActionType(type)}
        />
      ),
    },
    {
      key: 'confirmed',
      tab: `${t('bookings.confirmed')} (${confirmed.length})`,
      content: (
        <Confirmed
          bookingType={bookingTypeActiveKey}
          bookings={confirmed}
          openModal={() => setModalVisible(true)}
          setModalContent={(content) => setModalContent(content)}
          setBookingId={(id) => setBookingId(id)}
          setActionType={(type) => setActionType(type)}
        />
      ),
    },
    {
      key: 'completed',
      tab: `${t('bookings.completed')} (${completed.length})`,
      content: (
        <Completed
          bookingType={bookingTypeActiveKey}
          bookings={completed}
        />
      ),
    },
    {
      key: 'declined',
      tab: `${t('bookings.declined')} (${declined.length})`,
      content: (
        <Declined
          bookings={declined}
        />
      ),
    },
  ];

  const bookingTabs = [
    {
      key: 'sitting_jobs',
      tab: t('bookings.sitting_jobs'),
      content: (
        <SittingJobs
          bookingStatusActiveKey={bookingStatusActiveKey}
          bookingStatusTabs={bookingStatusTabs}
          changeBookingStatusTab={changeBookingStatusTab}
        />
      ),
    },
    {
      key: 'sitting_service',
      tab: t('bookings.sitting_service'),
      content: (
        <SittingService
          bookingStatusActiveKey={bookingStatusActiveKey}
          bookingStatusTabs={bookingStatusTabs}
          changeBookingStatusTab={changeBookingStatusTab}
        />
      ),
    },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey={defaultKeyBookingType}
        onChange={changeBookingTypeTab}
        tabPosition="top"
        centered
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
        onOk={() => dispatch(fulfillAction(bookingId, actionType))}
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

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { sitterBookings } from '../../constants';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { decline } from '../../redux/actions/bookingActions';
import {
  getRequestedSittingJobs,
  getRequestedSittingService,
  getConfirmedSittingJobs,
  getConfirmedSittingService,
  getCompletedSittingJobs,
  getCompletedSittingService,
  getDeclinedSittingJobs,
  getDeclinedSittingService,
} from '../../redux/actions/bookingStatusActions';
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
  const {
    requested: requestedBookings,
    confirmed: confirmedBookings,
    completed: completedBookings,
    declined: declinedBookings,
  } = useSelector((state) => state.booking_status);

  const { screenWidth } = ScreenWidthListener();

  const [bookingTypeActiveKey, setBookingTypeActiveKey] = useState(defaultKeyBookingType);
  const [bookingStatusActiveKey, setBookingStatusActiveKey] = useState(defaultKeyBookingStatus);
  const [requested, setRequested] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [declined, setDeclined] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [confirmActionType, setConfirmActionType] = useState('');
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    if (requestedBookings) {
      setRequested(requestedBookings);
      return;
    }
    if (confirmedBookings) {
      setConfirmed(confirmedBookings);
      return;
    }
    if (completedBookings) {
      setCompleted(completedBookings);
      return;
    }
    if (declinedBookings) {
      setDeclined(declinedBookings);
      return;
    }
  }, [requestedBookings, confirmedBookings, completedBookings, declinedBookings]);

  const getRequestedBookings = () => {
    if (bookingTypeActiveKey === 'sitting_jobs') {
      dispatch(getRequestedSittingJobs());
    } else {
      dispatch(getRequestedSittingService());
    }
  };

  const getConfirmedBookings = () => {
    if (bookingTypeActiveKey === 'sitting_jobs') {
      dispatch(getConfirmedSittingJobs());
    } else {
      dispatch(getConfirmedSittingService());
    }
  };

  const getCompletedBookings = () => {
    if (bookingTypeActiveKey === 'sitting_jobs') {
      dispatch(getCompletedSittingJobs());
    } else {
      dispatch(getCompletedSittingService());
    }
  };

  const getDeclinedBookings = () => {
    if (bookingTypeActiveKey === 'sitting_jobs') {
      dispatch(getDeclinedSittingJobs());
    } else {
      dispatch(getDeclinedSittingService());
    }
  };

  useEffect(() => {
    if (bookingStatusActiveKey === 'requested') {
      getRequestedBookings();
      return;
    }

    if (bookingStatusActiveKey === 'confirmed') {
      getConfirmedBookings();
      return;
    }

    if (bookingStatusActiveKey === 'completed') {
      getCompletedBookings();
      return;
    }

    if (bookingStatusActiveKey === 'declined') {
      getDeclinedBookings();
      return;
    }
  }, [bookingStatusActiveKey, dispatch]);

  useEffect(() => {
    getRequestedBookings();
  }, [bookingTypeActiveKey]);

  const changeBookingTypeTab = (key) => {
    setBookingTypeActiveKey(key);
  };

  const changeBookingStatusTab = (key) => {
    setBookingStatusActiveKey(key);
  };

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
          setConfirmActionType={(type) => setConfirmActionType(type)}
          setBookingId={(id) => setBookingId(id)}
          t={t}
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
          t={t}
        />
      ),
    },
    {
      key: 'completed',
      tab: `${t('bookings.completed')} (${completed.length})`,
      content: <Completed bookingType={bookingTypeActiveKey} bookings={completed} t={t} />,
    },
    {
      key: 'declined',
      tab: `${t('bookings.declined')} (${declined.length})`,
      content: <Declined bookings={declined} />,
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

  const performBookingAction = () => {
    switch (confirmActionType) {
      case 'decline':
        dispatch(decline(bookingId));
      default:
        break;
    }
  };

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
        onOk={() => performBookingAction()}
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

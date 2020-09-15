import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScreenWidthListener from '../../components/General/ScreenWidthListener';
import { sitterBookings } from '../../constants';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { decline } from '../../_actions/bookingActions';
import {
  getRequestedSittingJobs,
  getRequestedSittingService,
  getConfirmedSittingJobs,
  getConfirmedSittingService,
  getCompletedSittingJobs,
  getCompletedSittingService,
  getCancelledSittingJobs,
  getCancelledSittingService,
} from '../../_actions/bookingStatusActions';
import { SittingJobs, SittingService } from './Types';
import { Cancelled, Completed, Confirmed, Requested } from './Status';
import { Tabs } from 'antd';
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

  const { screenWidth } = ScreenWidthListener();
  const [tabPosition, setTabPosition] = useState('');

  const [bookingTypeActiveKey, setBookingTypeActiveKey] = useState(defaultKeyBookingType);
  const [bookingStatusActiveKey, setBookingStatusActiveKey] = useState(defaultKeyBookingStatus);
  const [bookings, setBookings] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [confirmActionType, setConfirmActionType] = useState('');
  const [bookingId, setBookingId] = useState('');

  const { requested = [{}], confirmed = [{}], completed = [{}], cancelled = [] } = bookings;

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

  const getCancelledBookings = () => {
    if (bookingTypeActiveKey === 'sitting_jobs') {
      dispatch(getCancelledSittingJobs());
    } else {
      dispatch(getCancelledSittingService());
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

    if (bookingStatusActiveKey === 'cancelled') {
      getCancelledBookings();
      return;
    }
  }, [bookingStatusActiveKey, dispatch]);

  useEffect(() => {
    getRequestedBookings();
  }, [bookingTypeActiveKey]);

  const changeBookingTypeTab = (key) => {
    setBookingTypeActiveKey(key);
    setBookingStatusActiveKey(defaultKeyBookingStatus);
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
      content: <Completed bookings={completed} t={t} />,
    },
    {
      key: 'cancelled',
      tab: `${t('bookings.cancelled')} (${cancelled.length})`,
      content: <Cancelled bookings={cancelled} />,
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

  useEffect(() => {
    if (screenWidth <= 930) {
      setTabPosition('top');
    } else {
      setTabPosition('left');
    }
  }, [screenWidth]);

  const performBookingAction = () => {
    switch (confirmActionType) {
      case 'decline':
        dispatch(decline(bookingId));
      default:
        break;
    }
  };

  return (
    <div style={{ display: 'flex', marginTop: 10 }}>
      <Tabs
        defaultActiveKey={defaultKeyBookingType}
        onChange={changeBookingTypeTab}
        tabPosition={tabPosition}
        className="vertical-tabs"
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

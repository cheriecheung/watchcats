import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setReadAsOwner, setReadAsSitter,
  // markBookingsAsRead,
  setAllBookingsAsRead
} from '../../redux/notifications/actions';

import { getRecords, fulfillAction } from '../../redux/bookings/actions';
import LOADING from '../../constants/loadingTypes'

const defaultKeyBookingType = 'sitting_jobs';
const defaultKeyBookingStatus = 'requested';

function useBookings() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const { bookings } = useSelector((state) => state.bookings);
  const { bookingsLoading } = useSelector((state) => state.loading);

  let isLoadingBookingRecords = bookingsLoading === LOADING.GET_BOOKINGS_RECORDS
  let isLoadingFulfillAction = bookingsLoading === LOADING.FULFILL_ACTION

  const [bookingTypeActiveKey, setBookingTypeActiveKey] = useState(defaultKeyBookingType);
  const [bookingStatusActiveKey, setBookingStatusActiveKey] = useState(defaultKeyBookingStatus);

  const [bookingId, setBookingId] = useState('');
  const [actionType, setActionType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const bookingStatusTabs = [
    {
      key: 'requested',
      tab: `${t('bookings.requested')}`
    },
    {
      key: 'confirmed',
      tab: `${t('bookings.confirmed')}`
    },
    {
      key: 'completed',
      tab: `${t('bookings.completed')}`

    },
    {
      key: 'declined',
      tab: `${t('bookings.declined')}`
    },
  ]

  // useEffect(() => {
  //   if (bookingTypeActiveKey === 'sitting_jobs') {
  //     dispatch(getRecords('jobs'));
  //   } else {
  //     dispatch(getRecords('service'));
  //   }
  // }, [bookingTypeActiveKey]);

  // useEffect(() => {
  //   dispatch(markBookingsAsRead({ type: bookingTypeActiveKey, status: bookingStatusActiveKey }))
  // }, [bookingTypeActiveKey, bookingStatusActiveKey])

  useEffect(() => {
    dispatch({ type: bookingTypeActiveKey, status: bookingStatusActiveKey })
  }, [bookingTypeActiveKey, bookingStatusActiveKey]);

  useEffect(() => {
    const status = bookingStatusActiveKey;
    const {
      hasUnreadBookings,
      unreadBookingsAsOwner = {},
      unreadBookingsAsSitter = {}
    } = notifications || {};

    if (unreadBookingsAsOwner && unreadBookingsAsOwner[status]) {
      const unread = { ...unreadBookingsAsOwner }
      delete unread[status];
      dispatch(setReadAsOwner(unread))
    }

    if (unreadBookingsAsSitter && unreadBookingsAsSitter[status]) {
      const unread = { ...unreadBookingsAsSitter }
      delete unread[status];
      dispatch(setReadAsSitter(unread))
    }

    if (hasUnreadBookings &&
      Object.entries(unreadBookingsAsOwner).length === 0 &&
      Object.entries(unreadBookingsAsSitter).length === 0) {
      dispatch(setAllBookingsAsRead())
    }

  }, [notifications, bookingTypeActiveKey, bookingStatusActiveKey]);

  function onHandleRequestedBooking(bookingId, actionType) {
    setModalVisible(true)
    setBookingId(bookingId);

    if (actionType === 'decline') {
      setModalContent(t('bookings.decline_confirm'));
      setActionType('decline');
    }
    if (actionType === 'accept') {
      setModalContent(t('bookings.accept_confirm'));
      setActionType('accept');
    }
  }

  function onCompleteBooking(bookingId) {
    setModalVisible(true)
    setBookingId(bookingId);
    setModalContent(t('bookings.complete_confirm'));
    setActionType('complete');
  }

  function submitAction() {
    dispatch(fulfillAction(bookingId, actionType))
  }

  return {
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
    isLoadingBookingRecords,
    isLoadingFulfillAction
  }
}

export { useBookings }
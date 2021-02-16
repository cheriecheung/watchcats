import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getBookings, fulfillAction } from '../../redux/bookings/actions';
import LOADING from '../../constants/loadingTypes'

const defaultKeyBookingType = 'sitting_jobs';
const defaultKeyBookingStatus = 'requested';

function useBookings() {
  const { t } = useTranslation();
  const language = localStorage.getItem('lang') || 'en'

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const { bookings, bookingCounts } = useSelector((state) => state.bookings);
  const { bookingsLoading } = useSelector((state) => state.loading);

  let isLoadingBookings = bookingsLoading === LOADING.GET_BOOKINGS
  let isLoadingFulfillAction = bookingsLoading === LOADING.FULFILL_ACTION

  const [clickedType, setClickedType] = useState(defaultKeyBookingType);
  const [clickedStatus, setClickedStatus] = useState(defaultKeyBookingStatus);
  const [statusTabs, setStatusTabs] = useState([])

  const [bookingId, setBookingId] = useState('');
  const [actionType, setActionType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    if (bookingCounts) {
      const { requested = 0, confirmed = 0, completed = 0, declined = 0 } = bookingCounts;

      const updatedTabs = [
        {
          key: 'requested',
          tab: `${t('bookings.requested')} (${requested})`
        },
        {
          key: 'confirmed',
          tab: `${t('bookings.confirmed')} (${confirmed})`
        },
        {
          key: 'completed',
          tab: `${t('bookings.completed')} (${completed})`
        },
        {
          key: 'declined',
          tab: `${t('bookings.declined')} (${declined})`
        },
      ]

      setStatusTabs(updatedTabs)
    }
  }, [bookingCounts, language])

  useEffect(() => {
    const type = clickedType;
    const status = clickedStatus;

    dispatch(getBookings(type, status))
  }, [clickedType, clickedStatus]);

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
    submitAction,
  }
}

export { useBookings }
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setReadAsOwner, setReadAsSitter, setAllBookingsAsRead } from '../../redux/notifications/actions';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { review_default_values as defaultValues } from './_formConfig/_defaultValues'
import { review_schema } from './_formConfig/_validationSchema';

import {
  getRecords,
  fulfillAction,
  getBookingInfo,
  submitReview
} from '../../redux/bookings/actions';
import LOADING from '../../constants/loadingTypes'

const defaultKeyBookingType = 'sitting_jobs';
const defaultKeyBookingStatus = 'requested';

function useBookings() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const { bookings: returnedBookings } = useSelector((state) => state.bookings);
  const { bookingsLoading } = useSelector((state) => state.loading);

  let isLoadingBookingRecords = bookingsLoading === LOADING.GET_BOOKINGS_RECORDS
  let isLoadingFulfillAction = bookingsLoading === LOADING.FULFILL_ACTION

  const [bookings, setBookings] = useState({})
  const [bookingStatusTabs, setBookingStatusTabs] = useState([]);

  const [bookingTypeActiveKey, setBookingTypeActiveKey] = useState(defaultKeyBookingType);
  const [bookingStatusActiveKey, setBookingStatusActiveKey] = useState(defaultKeyBookingStatus);

  const [bookingId, setBookingId] = useState('');
  const [actionType, setActionType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const { requested, confirmed, completed, declined } = bookings || {}

    if (requested && confirmed && completed && declined) {
      const statusTabs = [
        {
          key: 'requested',
          tab: `${t('bookings.requested')} (${bookings.requested.length})`
        },
        {
          key: 'confirmed',
          tab: `${t('bookings.confirmed')}  (${bookings.confirmed.length})`
        },
        {
          key: 'completed',
          tab: `${t('bookings.completed')}  (${bookings.completed.length})`
        },
        {
          key: 'declined',
          tab: `${t('bookings.declined')}  (${bookings.declined.length})`
        },
      ]

      setBookingStatusTabs(statusTabs)
    }
  }, [bookings])

  useEffect(() => {
    if (returnedBookings) {
      setBookings(returnedBookings)
    }
  }, [returnedBookings]);

  useEffect(() => {
    if (bookingTypeActiveKey === 'sitting_jobs') {
      dispatch(getRecords('jobs'));
    } else {
      dispatch(getRecords('services'));
    }
  }, [bookingTypeActiveKey]);

  useEffect(() => {
    const status = bookingStatusActiveKey;
    const {
      hasUnreadBookings,
      unreadBookingsAsOwner,
      unreadBookingsAsSitter
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

    console.log({ unreadBookingsAsOwner, unreadBookingsAsSitter })

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

function useWriteReview() {
  const { t } = useTranslation();
  const history = useHistory();
  const { bookingId } = useParams();

  const dispatch = useDispatch();
  const { bookingInfo, reviewSubmitted } = useSelector((state) => state.bookings);

  const [showModal, setShowModal] = useState(false)

  const resolver = yupResolver(review_schema)
  const methods = useForm({ defaultValues, resolver });

  useEffect(() => {
    dispatch(getBookingInfo(bookingId))
  }, [bookingId])

  useEffect(() => {
    if (reviewSubmitted) {
      setShowModal(true)
    }
  }, [reviewSubmitted])

  function onSubmit(data) {
    dispatch(submitReview(bookingId, data))
  };

  function closeModal() {
    setShowModal(false)

    if (reviewSubmitted) {
      history.push('/bookings');
    }
  }

  return {
    t,
    FormProvider,
    methods,
    onSubmit,
    bookingInfo,
    showModal,
    closeModal,
  }
}

export { useBookings, useWriteReview }
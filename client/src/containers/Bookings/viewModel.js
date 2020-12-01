import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { review_schema } from '../Account/_formConfig';

import { getRecords, fulfillAction, submitReview } from '../../redux/bookings/actions';

const defaultKeyBookingType = 'sitting_jobs';
const defaultKeyBookingStatus = 'requested';

function useBookings() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { bookings: returnedBookings } = useSelector((state) => state.bookings);

  const [loading, setLoading] = useState(false)

  const [bookingTypeActiveKey, setBookingTypeActiveKey] = useState(defaultKeyBookingType);
  const [bookingStatusActiveKey, setBookingStatusActiveKey] = useState(defaultKeyBookingStatus);

  const [bookingId, setBookingId] = useState('');
  const [actionType, setActionType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [bookings, setBookings] = useState({ requested: [], confirmed: [], completed: [], declined: [] })

  const bookingTypeTabs = [
    { key: 'sitting_jobs', tab: t('bookings.as_cat_sitter') },
    { key: 'sitting_service', tab: t('bookings.as_cat_owner') },
  ];

  const bookingStatusTabs = [
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

  function submitAction() {
    dispatch(fulfillAction(bookingId, actionType))
  }

  return {
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
  }
}

const defaultValues = {
  review: '',
  rating: 0
};

function useWriteReview() {
  const { t } = useTranslation();
  const history = useHistory();
  const { bookingId } = useParams();

  const { booking } = useLocation().state || {};

  const dispatch = useDispatch();
  const { reviewBooking, reviewSubmitted } = useSelector((state) => state.bookings);

  const [showModal, setShowModal] = useState(false)

  const resolver = yupResolver(review_schema)
  const methods = useForm({ defaultValues, resolver });

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
    booking,
    showModal,
    closeModal,
  }
}

export { useBookings, useWriteReview }
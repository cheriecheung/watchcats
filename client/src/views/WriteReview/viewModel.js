import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking, submitReview } from '../../redux/bookings/actions';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { review_default_values as defaultValues } from './_formConfig/_defaultValues'
import { review_schema } from './_formConfig/_validationSchema';

function useWriteReview() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const bookingId = new URLSearchParams(location?.search || "").get("booking");

  const dispatch = useDispatch();
  const { bookingInfo, reviewSubmitted } = useSelector((state) => state.bookings);

  const [bookingType, setBookingType] = useState('')
  const [showModal, setShowModal] = useState(false)

  const resolver = yupResolver(review_schema)
  const methods = useForm({ defaultValues, resolver });

  useEffect(() => {
    if (bookingId) {
      dispatch(getBooking(bookingId))
    }
  }, [bookingId])

  useEffect(() => {
    if (bookingInfo) {
      const { owner, sitter } = bookingInfo || {};

      if (owner) {
        setBookingType('sitting_jobs')
      }

      if (sitter) {
        setBookingType('sitting_service')
      }
    }
  }, [bookingInfo])

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
    bookingType,
    showModal,
    closeModal,
  }
}

export { useWriteReview }
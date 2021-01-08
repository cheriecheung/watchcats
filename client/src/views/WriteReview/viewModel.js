import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  const { id } = useParams();

  const dispatch = useDispatch();
  const { bookingInfo, reviewSubmitted } = useSelector((state) => state.bookings);

  const [showModal, setShowModal] = useState(false)

  const resolver = yupResolver(review_schema)
  const methods = useForm({ defaultValues, resolver });

  useEffect(() => {
    dispatch(getBooking(id))
  }, [id])

  useEffect(() => {
    if (reviewSubmitted) {
      setShowModal(true)
    }
  }, [reviewSubmitted])

  function onSubmit(data) {
    dispatch(submitReview(id, data))
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

export { useWriteReview }
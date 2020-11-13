import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecords, fulfillAction } from '../../redux/actions/bookingActions';

const defaultKeyBookingType = 'sitting_jobs';
const defaultKeyBookingStatus = 'requested';

function useBookings() {
  const dispatch = useDispatch();
  const { bookings: returnedBookings } = useSelector((state) => state.bookings);

  const [loading, setLoading] = useState(false)
  const [bookings, setBookings] = useState({ requested: [], confirmed: [], completed: [], declined: [] })

  const [bookingTypeActiveKey, setBookingTypeActiveKey] = useState(defaultKeyBookingType);
  const [bookingStatusActiveKey, setBookingStatusActiveKey] = useState(defaultKeyBookingStatus);

  const [bookingId, setBookingId] = useState('');
  const [actionType, setActionType] = useState('');

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
    bookings,
    bookingTypeActiveKey,
    setBookingTypeActiveKey,
    bookingStatusActiveKey,
    setBookingStatusActiveKey,
    setBookingId,
    setActionType,
    submitAction
  }
}

export { useBookings }
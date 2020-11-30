import Immutable from 'seamless-immutable';
import BookingActionTypes from './actionTypes'

const bookings_reducer = {
  bookings: (state = {}, action) => {
    switch (action.type) {
      case BookingActionTypes.OWNER_PROFILE_NOT_FOUND:
        return { ...state, profileActionStatus: action.payload };
      case BookingActionTypes.APPOINTMENT_TIME_NOT_FOUND:
        return { ...state, profileActionStatus: action.payload };
      case BookingActionTypes.APPOINTMENT_TIME_RETURNED:
        return { ...state, appointmentTime: action.payload };
      case BookingActionTypes.BOOKING_REQUEST_SENT:
        return { ...state, profileActionStatus: 'BOOKING_REQUEST_SENT' };
      case BookingActionTypes.BOOKING_RECORDS_RETURNED:
        return { bookings: action.payload };
      case BookingActionTypes.ACTION_FULFILLED:
        return 'booking action fulfilled'
      case BookingActionTypes.REVIEW_SUBMITTED:
        return 'You submitted your review';
      default:
        return state;
    }
  }
}

export default bookings_reducer
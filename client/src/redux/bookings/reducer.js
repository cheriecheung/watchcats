import Immutable from 'seamless-immutable';
import BookingActionTypes from './actionTypes'

const initialState = Immutable({
  bookings: [],
  bookingCounts: {
    requested: 0,
    confirmed: 0,
    completed: 0,
    declined: 0
  },
  bookingInfo: {},
  reviewSubmitted: false,
});

const bookings_reducer = {
  bookings: (state = initialState, action) => {
    switch (action.type) {
      case BookingActionTypes.OWNER_PROFILE_NOT_FOUND:
        return { ...state, profileActionStatus: action.payload };
      case BookingActionTypes.APPOINTMENT_TIME_NOT_FOUND:
        return { ...state, profileActionStatus: action.payload };
      case BookingActionTypes.APPOINTMENT_TIME_RETURNED:
        return {
          ...state,
          appointmentTime: action.payload,
          profileActionStatus: 'APPOINTMENT_TIME_RETURNED'
        };
      case BookingActionTypes.BOOKING_REQUEST_SENT:
        return { ...state, profileActionStatus: 'BOOKING_REQUEST_SENT' };
      case BookingActionTypes.BOOKING_RETURNED:
        return {
          ...state,
          bookings: action.payload.bookings,
          bookingCounts: action.payload.bookingCounts
        };
      case BookingActionTypes.ACTION_FULFILLED:
        return state;
      case BookingActionTypes.BOOKING_INFO_RETURNED:
        return { ...state, bookingInfo: action.payload }
      case BookingActionTypes.REVIEW_SUBMITTED:
        return { ...state, reviewSubmitted: true };
      default:
        return state;
    }
  }
}

export default bookings_reducer
const bookingsReducer = {
  bookings: (state = {}, action) => {
    switch (action.type) {
      case 'APPOINTMENT_TIME_NOT_FOUND':
        return { error: action.payload };
      case 'OWNER_PROFILE_NOT_FOUND':
        return { error: action.payload };
      case 'APPOINTMENT_TIME_RETURNED':
        return { appointmentTime: action.payload };
      case 'BOOKING_REQUEST_SENT':
        return null;
      case 'BOOKING_RECORDS_RETURNED':
        return { bookings: action.payload };
      case 'ACTION_FULFILLED':
        return 'booking action fulfilled'
      case 'REVIEW_SUBMITTED':
        return 'You submitted your review';

      default:
        return state;
    }
  }
}

export default bookingsReducer
export function booking_status(state = {}, action) {
  switch (action.type) {
    case 'BOOKING_RECORDS_RETURNED':
      return { bookings: action.payload };
    default:
      return state;
  }
}

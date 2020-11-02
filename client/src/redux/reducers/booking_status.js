export function booking_status(state = {}, action) {
  const { payload } = action || {};
  const { data } = payload || {}

  switch (action.type) {
    case 'SITTING_JOBS_RETURNED':
    case 'SITTING_SERCVICE_RETURNED':
      return { bookings: data };
    default:
      return state;
  }
}

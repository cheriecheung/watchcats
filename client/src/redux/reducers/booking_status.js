export function booking_status(state = {}, action) {
  const { payload } = action || {};
  const { data, status } = payload || {}

  switch (action.type) {
    case 'SITTING_JOBS_RETURNED':
      return { jobs: data, status };
    case 'SITTING_SERCVICE_RETURNED':
      return { service: data, status };
    default:
      return state;
  }
}

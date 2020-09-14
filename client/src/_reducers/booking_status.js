export function booking_status(state = {}, action) {
  switch (action.type) {
    case 'GET_REQUESTED_SITTING_SERVICE':
      return { data: action.payload };
    default:
      return state;
  }
}

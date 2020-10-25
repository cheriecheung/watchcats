export function booking_status(state = {}, action) {
  switch (action.type) {
    case 'GET_REQUESTED_SITTING_JOBS':
    case 'GET_REQUESTED_SITTING_SERVICE':
      return { requested: action.payload };
    case 'GET_CONFIRMED_SITTING_JOBS':
    case 'GET_CONFIRMED_SITTING_SERVICE':
      return { confirmed: action.payload };
    case 'GET_COMPLETED_SITTING_JOBS':
    case 'GET_COMPLETED_SITTING_SERVICE':
      return { completed: action.payload };
    case 'GET_DECLINED_SITTING_JOBS':
    case 'GET_DECLINED_SITTING_SERVICE':
      return { declined: action.payload };
    default:
      return state;
  }
}

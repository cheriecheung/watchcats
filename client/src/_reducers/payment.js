export function payment(state = {}, action) {
  switch (action.type) {
    case 'ONBOARD_USER':
      return (window.location = action.payload);
    case 'GET_PAYMENT_INTENT':
    default:
      return state;
  }
}
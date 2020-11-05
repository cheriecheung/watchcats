const paymentReducer = {
  payment: (state = {}, action) => {
    switch (action.type) {
      case 'ONBOARD_USER':
        return (window.location = action.payload);
      case 'GET_PAYMENT_INTENT':
        return { data: action.payload };
      default:
        return state;
    }
  }
}

export default paymentReducer
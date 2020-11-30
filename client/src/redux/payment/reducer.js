import Immutable from 'seamless-immutable';
import PaymentActionTypes from './actionTypes'

const payment_reducer = {
  payment: (state = {}, action) => {
    switch (action.type) {
      case PaymentActionTypes.ONBOARD_USER:
        return (window.location = action.payload);
      case PaymentActionTypes.GET_PAYMENT_INTENT:
        return { data: action.payload };
      default:
        return state;
    }
  }
}

export default payment_reducer
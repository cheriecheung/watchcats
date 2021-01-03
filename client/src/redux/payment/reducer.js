import Immutable from 'seamless-immutable';
import PaymentActionTypes from './actionTypes'

const payment_reducer = {
  payment: (state = {}, action) => {
    switch (action.type) {
      case PaymentActionTypes.GET_PAYMENT_INTENT:
        return { data: action.payload };
      case PaymentActionTypes.ONBOARD_USER:
      default:
        return state;
    }
  }
}

export default payment_reducer
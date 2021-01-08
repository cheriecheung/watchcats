import Immutable from 'seamless-immutable';
import PaymentActionTypes from './actionTypes'

const initialState = Immutable({
  clientSecret: '',
  stripeAccountId: '',
})

const payment_reducer = {
  payment: (state = initialState, action) => {
    switch (action.type) {
      case PaymentActionTypes.GET_PAYMENT_INTENT:
        return {
          ...state,
          clientSecret: action.payload.client_secret,
          stripeAccountId: action.payload.stripeAccountId
        };
      case PaymentActionTypes.ONBOARD_USER:
      default:
        return state;
    }
  }
}

export default payment_reducer
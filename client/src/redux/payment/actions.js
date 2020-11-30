import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import PaymentActionTypes from './actionTypes'

const { REACT_APP_API_DOMAIN } = process.env;

const onboardURL = `${REACT_APP_API_DOMAIN}/onboard-user`;
const paymentURL = `${REACT_APP_API_DOMAIN}/payment`;

export function onboardUser() {
  return async (dispatch) => {
    try {
      const {
        data: { url },
      } = await axiosInstance().get(onboardURL, getConfig());
      dispatch({ type: PaymentActionTypes.ONBOARD_USER, payload: url });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getPaymentIntent(bookingId) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(paymentURL, { bookingId }, getConfig());
      dispatch({ type: PaymentActionTypes.GET_PAYMENT_INTENT, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

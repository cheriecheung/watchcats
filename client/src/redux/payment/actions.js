import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import PaymentActionTypes from './actionTypes'
import LoadingActionTypes from '../loading/actionTypes'
import { clearLoading } from '../loading/actions'
import LOADING from '../../constants/loadingTypes'

const { REACT_APP_API_DOMAIN } = process.env;

const onboardURL = `${REACT_APP_API_DOMAIN}/onboard-user`;
const paymentURL = `${REACT_APP_API_DOMAIN}/payment`;

export function onboardUser() {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_PAYMENT_LOADING,
      payload: LOADING.SETUP_PAYOUTS
    });

    try {
      const { data } = await axiosInstance().get(onboardURL, getConfig());
      const { accountLink } = data;
      window.location = accountLink;

      dispatch({ type: PaymentActionTypes.ONBOARD_USER });
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('paymentLoading'))
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

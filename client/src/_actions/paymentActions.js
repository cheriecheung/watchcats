import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const onboardURL = `${REACT_APP_API_DOMAIN}/onboard-user`;
const paymentURL = `${REACT_APP_API_DOMAIN}/payment`;

const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

export function onboardUser() {
  return async (dispatch) => {
    try {
      const {
        data: { url },
      } = await axios.get(onboardURL, config);
      dispatch({ type: 'ONBOARD_USER', payload: url });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getPaymentIntent(bookingId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(paymentURL, { bookingId }, config);
      console.log({ data });
      dispatch({ type: 'GET_PAYMENT_INTENT', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

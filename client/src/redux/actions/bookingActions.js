import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const appointmentTimeUrl = `${REACT_APP_API_DOMAIN}/booking/time`;
const bookingRequestUrl = `${REACT_APP_API_DOMAIN}/booking/request`;

const declineUrl = (id) => `${REACT_APP_API_DOMAIN}/booking/${id}/decline`;
const scheduleMeetupUrl = (id) => `${REACT_APP_API_DOMAIN}/booking/${id}/schedule-meetup`;
const acceptUrl = (id) => `${REACT_APP_API_DOMAIN}/booking/${id}/accept`;
const cancelUrl = (id) => `${REACT_APP_API_DOMAIN}/booking/${id}/cancel`;
const completedUrl = (id) => `${REACT_APP_API_DOMAIN}/booking/${id}/completed`;
const reviewUrl = `${REACT_APP_API_DOMAIN}/review`;

const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

export function getAppointmentTime() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(appointmentTimeUrl, config);
      dispatch({ type: 'GET_APPOINTMENT_TIME', payload: data });
    } catch (e) {
      const errorType = e.response.data;

      if (errorType === 'OWNER_PROFILE_NOT_FOUND') {
        dispatch({ type: errorType, payload: errorType });
      }
      if (errorType === 'APPOINTMENT_TIME_NOT_FOUND') {
        dispatch({ type: errorType, payload: errorType });
      }
    }
  };
}

export function sendBookingRequest(bookingData) {
  return async (dispatch) => {
    try {
      const { data } = axios.post(bookingRequestUrl, bookingData, config);
      dispatch({ type: 'SEND_BOOKING_REQUEST', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function decline(id) {
  return async (dispatch) => {
    try {
      await axios.put(declineUrl(id), config);
      dispatch({ type: 'DECLINE_BOOKING' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function scheduleMeetup(id) {
  return async (dispatch) => {
    try {
      await axios.put(scheduleMeetupUrl(id), config);
      dispatch({ type: 'SCHEDULE_MEETUP' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function accept(id) {
  return async (dispatch) => {
    try {
      await axios.put(acceptUrl(id), config);
      dispatch({ type: 'ACCEPT_BOOKING' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function cancel(id) {
  return async (dispatch) => {
    try {
      await axios.put(cancelUrl(id), config);
      dispatch({ type: 'CANCEL_BOOKING' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function completed(id) {
  return async (dispatch) => {
    try {
      await axios.put(completedUrl(id), config);
      dispatch({ type: 'COMPLETED_BOOKING' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function submitReview(bookingId, reviewContent) {
  return async (dispatch) => {
    try {
      await axios.post(reviewUrl, config, { bookingId, reviewContent });
      dispatch({ type: 'SUBMIT_REVIEW' });
    } catch (e) {
      console.log({ e });
    }
  };
}

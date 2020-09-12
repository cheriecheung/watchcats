import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const appointmentTimeUrl = `${REACT_APP_API_DOMAIN}/booking/time`;
const requestUrl = `${REACT_APP_API_DOMAIN}/booking/request`;

const sittingJobBookingsURL = `${REACT_APP_API_DOMAIN}/booking/sitting-job`;
const sittingServiceBookingsUrl = `${REACT_APP_API_DOMAIN}/booking/sitting-service`;

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
  return (dispatch) => {
    axios
      .get(appointmentTimeUrl, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'GET_APPOINTMENT_TIME',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log({ error });

        const errorType = error.response.data;

        if (errorType === 'OWNER_PROFILE_NOT_FOUND') {
          dispatch({ type: errorType, payload: errorType });
        }

        if (errorType === 'APPOINTMENT_TIME_NOT_FOUND') {
          dispatch({ type: errorType, payload: errorType });
        }
      });
  };
}

export function sendBookingRequest(data) {
  return (dispatch) => {
    axios
      .post(requestUrl, data, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'SEND_BOOKING_REQUEST',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function getAllSittingJobBookings() {
  return (dispatch) => {
    axios
      .get(sittingJobBookingsURL, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'GET_SITTING_JOB_BOOKINGS',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function getAllSittingServiceBookings() {
  return (dispatch) => {
    axios
      .get(sittingServiceBookingsUrl, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'GET_SITTING_JOB_BOOKINGS',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function decline(id) {
  return (dispatch) => {
    axios
      .put(declineUrl(id), config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'DECLINE_BOOKING',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function scheduleMeetup(id) {
  return (dispatch) => {
    axios
      .put(scheduleMeetupUrl(id), config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'SCHEDULE_MEETUP',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function accept(id) {
  return (dispatch) => {
    axios
      .put(acceptUrl(id), config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'ACCEPT_BOOKING',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function cancel(id) {
  return (dispatch) => {
    axios
      .put(cancelUrl(id), config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'CANCEL_BOOKING',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function completed(id) {
  return (dispatch) => {
    axios
      .put(completedUrl(id), config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'COMPLETED_BOOKING',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function submitReview(bookingId, reviewContent) {
  return (dispatch) => {
    axios
      .post(reviewUrl, config, { bookingId, reviewContent })
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'SUBMIT_REVIEW',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

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

export function sendBookingRequest(sitterId) {
  return (dispatch) => {
    axios
      .post(requestUrl, config)
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
    console.log('your id is' + id);

    // axios
    //   .post(declineUrl(id), config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'DECLINE_BOOKING',
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function scheduleMeetup(id) {
  return (dispatch) => {
    axios
      .post(scheduleMeetupUrl(id), config)
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
      .post(acceptUrl(id), config)
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
      .post(cancelUrl(id), config)
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
      .post(completedUrl(id), config)
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

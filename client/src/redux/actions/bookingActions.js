import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'

const appointmentTimeUrl = `/booking-time`;
const bookingUrl = `/booking`;
const bookingsURL = type => `/bookings?type=${type}`
const reviewURL = bookingId => `/review/${bookingId}`;

const getConfig = () => {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }
}

export function getAppointmentTime() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(appointmentTimeUrl, getConfig());

      if (data === 'OWNER_PROFILE_NOT_FOUND' || data === 'APPOINTMENT_TIME_NOT_FOUND') {
        dispatch({ type: data, payload: data });
      } else {
        dispatch({ type: 'APPOINTMENT_TIME_RETURNED', payload: data });
      }
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sendRequest(bookingData) {
  return async (dispatch) => {
    try {
      const { data } = axiosInstance().post(bookingUrl, bookingData, getConfig());
      dispatch({ type: 'BOOKING_REQUEST_SENT', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getRecords(type) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(bookingsURL(type), getConfig());

      dispatch({ type: 'BOOKING_RECORDS_RETURNED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function fulfillAction(id, action) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().patch(bookingUrl, { id, action }, getConfig());

      dispatch({ type: 'ACTION_FULFILLED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function submitReview(bookingId, data) {
  return async (dispatch) => {
    try {
      await axiosInstance().post(reviewURL(bookingId), data, getConfig());
      dispatch({ type: 'REVIEW_SUBMITTED', payload: '' });
    } catch (e) {
      console.log({ e });
    }
  };
}

import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import BookingActionTypes from './actionTypes'
import ErrorActionTypes from '../error/actionTypes'
import LoadingActionTypes from '../loading/actionTypes'
import { clearLoading } from '../loading/actions'
import LOADING from '../../constants/loadingTypes'
import NotificationsActionTypes from '../notifications/actionTypes'

const appointmentTimeUrl = `/booking-time`;
const bookingUrl = `/booking`;
const bookingsURL = (type, status) => `/bookings?type=${type}&status=${status}`;
const reviewURL = bookingId => `/review/${bookingId}`;

export function getAppointmentTime() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(appointmentTimeUrl, getConfig());

      if (data === BookingActionTypes.OWNER_PROFILE_NOT_FOUND || data === BookingActionTypes.APPOINTMENT_TIME_NOT_FOUND) {
        dispatch({ type: data, payload: data });
      } else {
        dispatch({ type: BookingActionTypes.APPOINTMENT_TIME_RETURNED, payload: data });
      }
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sendRequest(bookingData) {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_BOOKINGS_LOADING,
      payload: LOADING.SEND_BOOKING_REQUEST
    });

    try {
      const { data } = await axiosInstance().post(bookingUrl, bookingData, getConfig());
      dispatch({ type: BookingActionTypes.BOOKING_REQUEST_SENT, payload: data });
      dispatch(clearLoading('bookingsLoading'))
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_BOOKINGS_ERROR, payload: data })
      dispatch(clearLoading('bookingsLoading'))
    }
  };
}

export function getBookings(type, status) {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_BOOKINGS_LOADING,
      payload: LOADING.GET_BOOKINGS
    });

    try {
      const { data } = await axiosInstance().get(
        bookingsURL(type, status),
        getConfig()
      );

      const { bookings, bookingCounts, notifications } = data

      // if (notifiations)  update notifications
      console.log({ notifications })
      if (notifications) {
        const { hasUnreadBookings, unreadBookingsAsOwner, unreadBookingsAsSitter } = notifications;

        dispatch({
          type: NotificationsActionTypes.UPDATE_BOOKING_NOTIFICATIONS,
          payload: { hasUnreadBookings, unreadBookingsAsOwner, unreadBookingsAsSitter }
        })
      }

      dispatch({
        type: BookingActionTypes.BOOKING_RETURNED,
        payload: { bookings, bookingCounts }
      });

      dispatch(clearLoading('bookingsLoading'))
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('bookingsLoading'))
    }
  };
}

export function fulfillAction(id, action) {
  return async (dispatch) => {
    dispatch({
      type: LoadingActionTypes.SET_BOOKINGS_LOADING,
      payload: LOADING.FULFILL_ACTION
    });

    try {
      const { data } = await axiosInstance().patch(bookingUrl, { id, action }, getConfig());

      window.location.reload()

      dispatch({ type: BookingActionTypes.ACTION_FULFILLED, payload: data });
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('bookingsLoading'))
    }
  };
}

export function getBooking(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(`${bookingUrl}/${id}`, getConfig());
      dispatch({ type: BookingActionTypes.BOOKING_INFO_RETURNED, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function submitReview(bookingId, data) {
  return async (dispatch) => {
    try {
      await axiosInstance().post(reviewURL(bookingId), data, getConfig());
      dispatch({ type: BookingActionTypes.REVIEW_SUBMITTED, payload: '' });
    } catch (e) {
      console.log({ e });
    }
  };
}

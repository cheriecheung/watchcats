import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import NotificationsActionTypes from './actionTypes'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const notificationsURL = `/notifications`
const bookingsURL = (type, status) => `/bookings?type=${type}&status=${status}`

export function getNotifications() {
  return async (dispatch) => {
    const refresh_token = cookies.get('refreshToken');
    if (!refresh_token) return;

    try {
      const { data } = await axiosInstance().get(notificationsURL, getConfig());
      dispatch({
        type: NotificationsActionTypes.GET_NOTIFICATIONS,
        payload: data
      });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function markBookingsAsRead({ type, status }) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().patch(bookingsURL(type, status), {}, getConfig());

      const { unreadBookingsAsOwner, unreadBookingsAsSitter } = data

      // if (type === 'jobs') {
      //   dispatch({
      //     type: NotificationsActionTypes.UPDATE_BOOKINGS_AS_SITTER_NOTIFICATIONS,
      //     payload: { unreadBookingsAsSitter }
      //   });
      // }

      // if (type === 'service') {
      //   dispatch({
      //     type: NotificationsActionTypes.UPDATE_BOOKINGS_AS_OWNER_NOTIFICATIONS,
      //     payload: { unreadBookingsAsOwner }
      //   });
      // }

    } catch (e) {
      console.log({ e });
    }
  };
}

export function setReadAsOwner(remainingUnread) {
  return async (dispatch) => {
    dispatch({
      type: NotificationsActionTypes.SET_READ_AS_OWNER,
      payload: { remainingUnread }
    });
  }
}

export function setReadAsSitter(remainingUnread) {
  return async (dispatch) => {
    dispatch({
      type: NotificationsActionTypes.SET_READ_AS_SITTER,
      payload: { remainingUnread }
    });
  }
}

export function setAllBookingsAsRead() {
  return async (dispatch) => {
    dispatch({ type: NotificationsActionTypes.SET_ALL_BOOKINGS_AS_READ });
  }
}
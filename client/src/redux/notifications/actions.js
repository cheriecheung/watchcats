import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import NotificationsActionTypes from './actionTypes'

const notificationsURL = `/notifications`

export function getNotifications() {
  return async (dispatch) => {
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
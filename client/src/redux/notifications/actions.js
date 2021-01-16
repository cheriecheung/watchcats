import axiosInstance from '../../utility/axiosInstance';
import { getConfig } from '../../utility/api'
import NotificationsActionTypes from './actionTypes'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const notificationsURL = `/notifications`

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
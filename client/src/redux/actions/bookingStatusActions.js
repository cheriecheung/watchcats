import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'

const bookingsURL = type => `/bookings?type=${type}`

const getConfig = () => {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }
}

export function getBookingRecords(type) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(bookingsURL(type), getConfig());

      dispatch({ type: 'BOOKING_RECORDS_RETURNED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

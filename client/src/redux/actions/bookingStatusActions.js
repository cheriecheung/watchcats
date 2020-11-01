import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'

const sittingJobURL = status => `/sitting-job?status=${status}`
const sittingServiceURL = status => `/sitting-service?status=${status}`

const getConfig = () => {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }
}

export function getSittingJobs(status) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(sittingJobURL(status), getConfig());

      dispatch({ type: 'SITTING_JOBS_RETURNED', payload: { data, status } });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getSittingService(status) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(sittingServiceURL(status), getConfig());
      dispatch({ type: 'SITTING_SERCVICE_RETURNED', payload: { data, status } });
    } catch (e) {
      console.log({ e });
    }
  };
}

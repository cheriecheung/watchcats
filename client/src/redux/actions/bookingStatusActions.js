import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const requestedSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/requested`;
const confirmedSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/confirmed`;
const completedSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/completed`;
const declinedSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/declined`;

const requestedSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/requested`;
const confirmedSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/confirmed`;
const completedSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/completed`;
const declinedSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/declined`;

const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

// Sitting Jobs

export function getRequestedSittingJobs() {
  return async (dispatch) => {
    console.log('you are getting REQUESTED sitting JOBS');

    try {
      const { data } = await axios.get(requestedSittingJobUrl, config);
      dispatch({ type: 'GET_REQUESTED_SITTING_JOBS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getConfirmedSittingJobs() {
  return async (dispatch) => {
    console.log('you are getting CONFIRMED sitting JOBS');
    try {
      const { data } = await axios.get(confirmedSittingJobUrl, config);
      dispatch({ type: 'GET_CONFIRMED_SITTING_JOBS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}
export function getCompletedSittingJobs() {
  return async (dispatch) => {
    console.log('you are getting COMPLETED sitting JOBS');
    try {
      const { data } = await axios.get(completedSittingJobUrl, config);
      dispatch({ type: 'GET_COMPLETED_SITTING_JOBS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getDeclinedSittingJobs() {
  return async (dispatch) => {
    console.log('you are getting DECLINED sitting JOBS');
    try {
      const { data } = await axios.get(declinedSittingJobUrl, config);
      dispatch({ type: 'GET_DECLINED_SITTING_JOBS', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

// Sitting Service

export function getRequestedSittingService() {
  return async (dispatch) => {
    console.log('you are getting REQUESTED sitting SERVICE');
    try {
      const { data } = await axios.get(requestedSittingServiceUrl, config);
      dispatch({ type: 'GET_REQUESTED_SITTING_SERVICE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getConfirmedSittingService() {
  return async (dispatch) => {
    console.log('you are getting CONFIRMED sitting SERVICe');
    try {
      const { data } = await axios.get(confirmedSittingServiceUrl, config);
      dispatch({ type: 'GET_CONFIRMED_SITTING_SERVICE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getCompletedSittingService() {
  return async (dispatch) => {
    console.log('you are getting COMPLETED sitting SERVICe');
    try {
      const { data } = await axios.get(completedSittingServiceUrl, config);
      dispatch({ type: 'GET_COMPLETED_SITTING_SERVICE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getDeclinedSittingService() {
  return async (dispatch) => {
    console.log('you are getting DECLINED sitting SERVICE');
    try {
      const { data } = axios.get(declinedSittingServiceUrl, config);
      dispatch({ type: 'GET_DECLINED_SITTING_SERVICE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

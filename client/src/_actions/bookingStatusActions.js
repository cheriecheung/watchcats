import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const requestedSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/requested`;
const confirmedSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/confirmed`;
const completedSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/completed`;
const cancelledSittingJobUrl = `${REACT_APP_API_DOMAIN}/sitting-job/cancelled`;

const requestedSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/requested`;
const confirmedSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/confirmed`;
const completedSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/completed`;
const cancelledSittingServiceUrl = `${REACT_APP_API_DOMAIN}/sitting-service/cancelled`;

const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

export function getRequestedSittingJobs() {
  return (dispatch) => {
    console.log('you are getting REQUESTED sitting JOBS');

    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getRequestedSittingService() {
  return (dispatch) => {
    console.log('you are getting REQUESTED sitting SERVICE');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getConfirmedSittingJobs() {
  return (dispatch) => {
    console.log('you are getting CONFIRMED sitting JOBS');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getConfirmedSittingService() {
  return (dispatch) => {
    console.log('you are getting CONFIRMED sitting SERVICe');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getCompletedSittingJobs() {
  return (dispatch) => {
    console.log('you are getting COMPLETED sitting JOBS');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getCompletedSittingService() {
  return (dispatch) => {
    console.log('you are getting COMPLETED sitting SERVICe');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getCancelledSittingJobs() {
  return (dispatch) => {
    console.log('you are getting CANCELED sitting JOBS');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getCancelledSittingService() {
  return (dispatch) => {
    console.log('you are getting CANCELLED sitting SERVICE');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_REQUESTED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

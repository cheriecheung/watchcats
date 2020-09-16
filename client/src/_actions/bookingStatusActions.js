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

export function getRequestedSittingJobs() {
  return (dispatch) => {
    console.log('you are getting REQUESTED sitting JOBS');
    axios
      .get(requestedSittingJobUrl, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'GET_REQUESTED_SITTING_JOBS',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function getRequestedSittingService() {
  return (dispatch) => {
    console.log('you are getting REQUESTED sitting SERVICE');
    axios
      .get(requestedSittingServiceUrl, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'GET_REQUESTED_SITTING_SERVICE',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
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
    //       type: 'GET_CONFIRMED_SITTING_JOBS',
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
    //       type: 'GET_CONFIRMED_SITTING_SERVICE',
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
    //       type: 'GET_COMPLETED_SITTING_JOBS',
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
    //       type: 'GET_COMPLETED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getDeclinedSittingJobs() {
  return (dispatch) => {
    console.log('you are getting DECLINED sitting JOBS');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_DECLINED_SITTING_JOBS',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

export function getDeclinedSittingService() {
  return (dispatch) => {
    console.log('you are getting DECLINED sitting SERVICE');
    // axios
    //   .get(requestedSittingServiceUrl, config)
    //   .then((response) => {
    //     console.log(response);
    //     dispatch({
    //       type: 'GET_DECLINED_SITTING_SERVICE',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => console.log(error.response));
  };
}

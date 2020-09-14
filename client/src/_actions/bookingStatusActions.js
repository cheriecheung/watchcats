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

export function getRequestedSittingService() {
  return (dispatch) => {
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

// export function getAllSittingJobBookings() {
//   return (dispatch) => {
//     axios
//       .get(sittingJobBookingsURL, config)
//       .then((response) => {
//         console.log(response);
//         dispatch({
//           type: 'GET_SITTING_JOB_BOOKINGS',
//           payload: response.data,
//         });
//       })
//       .catch((error) => console.log(error.response));
//   };
// }

// export function getAllSittingServiceBookings() {
//   return (dispatch) => {
//     axios
//       .get(sittingServiceBookingsUrl, config)
//       .then((response) => {
//         console.log(response);
//         dispatch({
//           type: 'GET_SITTING_JOB_BOOKINGS',
//           payload: response.data,
//         });
//       })
//       .catch((error) => console.log(error.response));
//   };
// }

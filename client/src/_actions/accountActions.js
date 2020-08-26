import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ownerURL = `${process.env.REACT_APP_API_DOMAIN}/user/owner`;
const sitterURL = `${process.env.REACT_APP_API_DOMAIN}/user/sitter`;
const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

export function getSitter() {
  return (dispatch) => {
    axios
      .get(sitterURL, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'GET_PROFILE',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function saveSitter(data) {
  console.log({ data });
  return (dispatch) => {
    axios
      .post(sitterURL, data, config)
      .then((response) => {
        console.log(response);

        dispatch({
          type: 'SAVE_PROFILE',
          payload: 'data',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function getOwner() {
  return (dispatch) => {
    axios
      .get(ownerURL, config)
      .then(({ data }) => {
        dispatch({
          type: 'GET_PROFILE',
          payload: data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function saveOwner(data) {
  console.log({ data });
  return (dispatch) => {
    axios
      .post(ownerURL, data, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'SAVE_PROFILE',
          payload: 'done',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

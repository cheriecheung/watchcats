import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ownerURL = `${process.env.REACT_APP_API_DOMAIN}/user/owner`;
const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

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
  return (dispatch) => {
    axios
      .post(ownerURL, data, config)
      .then((response) => {
        dispatch({
          type: 'SAVE_PROFILE',
          payload: 'done',
        });
      })
      .catch((error) => console.log(error.response));
  };
}

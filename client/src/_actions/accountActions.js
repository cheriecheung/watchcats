import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const userURL = `${REACT_APP_API_DOMAIN}/user`;
const profilePicURL = `${REACT_APP_API_DOMAIN}/user/profile-picture`;
const addressProofURL = `${REACT_APP_API_DOMAIN}/user/address-proof`;

const sitterAccountURL = (id) => `${REACT_APP_API_DOMAIN}/sitter/account/${id}`;
const sitterProfileURL = (id) => `${REACT_APP_API_DOMAIN}/sitter/profile/${id}`;
const ownerAccountURL = (id) => `${REACT_APP_API_DOMAIN}/owner/account/${id}`;
const ownerProfileURL = (id) => `${REACT_APP_API_DOMAIN}/owner/profile/${id}`;

// const ownerURL = `${process.env.REACT_APP_API_DOMAIN}/owner`;

const config = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
  },
};

export function getUser() {
  return (dispatch) => {
    axios
      .get(userURL, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'GET_USER',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function sendUser(data) {
  return (dispatch) => {
    axios
      .post(userURL, data, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'SAVE_USER',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function sendProfilePic(formData) {
  return (dispatch) => {
    axios
      .post(profilePicURL, formData, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'SAVE_PROFILE_PIC',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function sendAddressProof(formData) {
  return (dispatch) => {
    axios
      .post(addressProofURL, formData, config)
      .then((response) => {
        console.log(response);
        dispatch({
          type: 'SAVE_ADDRESS_PROOF',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function getOwnerProfile(id) {
  return (dispatch) => {
    axios
      .get(ownerProfileURL(id))
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

export function getSitterProfile(id) {
  return (dispatch) => {
    axios
      .get(sitterProfileURL(id))
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

export function getSitterAccount(id) {
  return (dispatch) => {
    axios
      .get(sitterAccountURL(id), config)
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

export function saveSitter(id, data) {
  console.log({ data });
  return (dispatch) => {
    axios
      .post(sitterAccountURL(id), data, config)
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

export function getOwnerAccount(id) {
  return (dispatch) => {
    axios
      .get(ownerAccountURL(id), config)
      .then(({ data }) => {
        dispatch({
          type: 'GET_PROFILE',
          payload: data,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function saveOwner(id, data) {
  console.log({ data });
  return (dispatch) => {
    axios
      .post(ownerAccountURL(id), data, config)
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

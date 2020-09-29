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
  return async (dispatch) => {
    try {
      const { data } = await axios.get(userURL, config);
      dispatch({ type: 'GET_USER', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sendUser(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(userURL, userData, config);
      dispatch({ type: 'GENERAL_INFO_SAVED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sendProfilePic(formData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(profilePicURL, formData, config);
      dispatch({ type: 'SAVE_PROFILE_PIC', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sendAddressProof(formData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(addressProofURL, formData, config);
      dispatch({ type: 'SAVE_ADDRESS_PROOF', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getOwnerProfile(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(ownerProfileURL(id));
      dispatch({ type: 'GET_PROFILE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getSitterProfile(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(sitterProfileURL(id));
      dispatch({ type: 'GET_PROFILE', payload: data });
      console.log({ data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getSitterAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(sitterAccountURL(id), config);
      dispatch({ type: 'GET_PROFILE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function saveSitter(id, sitterData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(sitterAccountURL(id), sitterData, config);
      dispatch({ type: 'SAVE_PROFILE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getOwnerAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(ownerAccountURL(id), config);
      dispatch({ type: 'GET_PROFILE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function saveOwner(id, ownerData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(ownerAccountURL(id), ownerData, config);
      dispatch({ type: 'SAVE_PROFILE', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

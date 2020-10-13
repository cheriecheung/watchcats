import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const { REACT_APP_API_DOMAIN } = process.env;

const userURL = `${REACT_APP_API_DOMAIN}/user`;
const pictureURL = `${REACT_APP_API_DOMAIN}/image`;
const profilePicURL = `${REACT_APP_API_DOMAIN}/image/profile-picture`;
const addressProofURL = `${REACT_APP_API_DOMAIN}/image/address-proof`;
const catPhotoURL = `${REACT_APP_API_DOMAIN}/image/cat`;

const sitterAccountURL = (id) => `${REACT_APP_API_DOMAIN}/sitter/account/${id}`;
const ownerAccountURL = (id) => `${REACT_APP_API_DOMAIN}/owner/account/${id}`;

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

export function deletePicture(filename) {
  return async (dispatch) => {
    try {
      await axios.delete(pictureURL, { ...config, data: { filename } });
      window.location.reload();
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getSitterAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(sitterAccountURL(id), config);
      console.log({ sitterAccountData: data });
      dispatch({ type: 'GET_SITTER_ACCOUNT', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function saveSitter(id, sitterData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(sitterAccountURL(id), sitterData, config);
      dispatch({ type: 'SITTER_ACCOUNT_SAVED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getOwnerAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(ownerAccountURL(id), config);
      dispatch({ type: 'GET_OWNER_ACCOUNT', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function saveOwner(id, ownerData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(ownerAccountURL(id), ownerData, config);
      dispatch({ type: 'OWNER_ACCOUNT_SAVED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

const catPhotoConfig = {
  withCredentials: true,
  headers: {
    Authorization: cookies.get('userId'),
    'content-ype': undefined
  },
};

export function saveCatPhotos(formData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(catPhotoURL, formData, catPhotoConfig);
      dispatch({ type: 'SAVE_CAT_PIC', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function removeCatPhoto(filename) {
  return async (dispatch) => {
    try {
      await axios.delete(catPhotoURL, { ...config, data: { filename } });
      dispatch({ type: 'CAT_PIC_REMOVED' });
    } catch (e) {
      console.log({ e });
    }
  };
}

import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'

const userURL = `/user`;
const imageURL = `/image`;
const profilePicURL = `/image/profile-picture`;
const addressProofURL = `/image/address-proof`;
const sitterURL = id => `/sitter/account/${id}`
const ownerURL = id => `/owner/account/${id}`
const catImageURL = `/image/cat`

const getConfig = () => {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }
}

export function sendAddressProof(formData) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(addressProofURL, formData, getConfig());
      dispatch({ type: 'SAVE_ADDRESS_PROOF', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getUser() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(userURL, getConfig());
      dispatch({ type: 'GET_USER', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sendUser(userData, profilePicture) {
  console.log({ userData })
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(userURL, userData, getConfig());

      // const formData = new FormData();
      // formData.append('profilePic', profilePicture);
      // await axiosInstance().post(profilePicURL, formData, getConfig());

      dispatch({ type: 'GENERAL_INFO_SAVED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function deletePicture(filename) {
  return async (dispatch) => {
    try {
      // image/profile-picture ?
      await axiosInstance().delete(imageURL, { ...getConfig(), data: { filename } });
      dispatch({ type: 'PROFILE_PIC_REMOVED', payload: 'removed' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getSitterAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(sitterURL(id), getConfig());
      dispatch({ type: 'GET_SITTER_ACCOUNT', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function saveSitter(id, sitterData) {
  return async (dispatch) => {
    try {
      const data = await axiosInstance().post(sitterURL(id), sitterData, getConfig());
      dispatch({ type: 'SITTER_ACCOUNT_SAVED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getOwnerAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(ownerURL(id), getConfig());
      dispatch({ type: 'GET_OWNER_ACCOUNT', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

const getCatConfig = () => {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'content-ype': undefined
    },
  }
}

export function saveOwner(id, ownerData, photos) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(ownerURL(id), ownerData, getConfig());

      // try {
      //   photos.forEach(async ({ file }, index) => {
      //     if (file) {
      //       const formData = new FormData();
      //       formData.append('catPhoto', file);
      //       formData.append('fieldArrayIndex', index)

      //       await axiosInstance().post(catImageURL, formData, getCatConfig());
      //     }
      //   })
      // } catch (e) {
      //   console.log({ e });
      // }

      dispatch({ type: 'OWNER_ACCOUNT_SAVED', payload: data });
    } catch (e) {
      console.log({ eSaveOwner: e.response });
    }
  };
}

export function removeCatPhoto(filename, index) {
  return async (dispatch) => {
    try {
      await axiosInstance().delete(catImageURL, { ...getConfig(), data: { filename } });
      dispatch({ type: 'CAT_PIC_REMOVED', payload: index });
    } catch (e) {
      console.log({ e });
    }
  };
}

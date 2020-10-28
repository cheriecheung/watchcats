import axios from 'axios';
import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'
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

export function sendUser(userData, profilePicture) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(userURL, userData, config);

      const formData = new FormData();
      formData.append('profilePic', profilePicture);
      await axios.post(profilePicURL, formData, config);

      dispatch({ type: 'GENERAL_INFO_SAVED', payload: data });
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
      dispatch({ type: 'PROFILE_PIC_REMOVED', payload: 'removed' });
    } catch (e) {
      console.log({ e });
    }
  };
}

const getConfig = () => {
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }
}

export function getSitterAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(`/sitter/account/${id}`, getConfig());
      dispatch({ type: 'GET_SITTER_ACCOUNT', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function saveSitter(id, sitterData) {
  return async (dispatch) => {
    try {
      const data = await axiosInstance().post(`/sitter/account/${id}`, sitterData, getConfig());
      dispatch({ type: 'SITTER_ACCOUNT_SAVED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getOwnerAccount(id) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(`/owner/account/${id}`, getConfig());
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
      const { data } = await axiosInstance().post(`/owner/account/${id}`, ownerData, getConfig());

      try {
        photos.forEach(async ({ file }, index) => {
          if (file) {
            const formData = new FormData();
            formData.append('catPhoto', file);
            formData.append('fieldArrayIndex', index)

            await axiosInstance().post(`/image/cat`, formData, getCatConfig());
          }
        })
      } catch (e) {
        console.log({ e });
      }
      console.log({ data })

      dispatch({ type: 'OWNER_ACCOUNT_SAVED', payload: data });
    } catch (e) {
      console.log({ eSaveOwner: e.response });
    }
  };
}

// export function saveOwner(id, ownerData, photos) {
//   return async (dispatch) => {
//     try {
//       const { data } = await axiosInstance().post(`/owner/account/${id}`, ownerData, getConfig());

//       photos.forEach(async ({ file }, index) => {
//         if (file) {
//           const formData = new FormData();
//           formData.append('catPhoto', file);
//           formData.append('fieldArrayIndex', index)

//           await axiosInstance().post(`/image/cat`, formData, getCatConfig());
//         }
//       })

//       dispatch({ type: 'OWNER_ACCOUNT_SAVED', payload: data });
//     } catch (e) {
//       console.log({ e });
//     }
//   };
// }

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

export function removeCatPhoto(filename, index) {
  return async (dispatch) => {
    try {
      await axios.delete(catPhotoURL, { ...config, data: { filename } });
      dispatch({ type: 'CAT_PIC_REMOVED', payload: index });
    } catch (e) {
      console.log({ e });
    }
  };
}
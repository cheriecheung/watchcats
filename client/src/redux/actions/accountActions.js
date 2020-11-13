import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'

const contactDetailsURL = `/contact-details`;
const phoneNumberURL = `/phone-number`;
const verificationCodeURL = `/verification-code`;
const personalInfoURL = `/personal-info`;
const imageURL = `/image`;
const profilePicURL = `/image/profile-picture`;
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

export function getContactDetails() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(contactDetailsURL, getConfig());
      dispatch({ type: 'CONTACT_DETAILS_RETURNED', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function submitPhoneNumber(phone) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(phoneNumberURL, { phone }, getConfig());
      dispatch({ type: 'PHONE_NUMBER_SUBMITTED', payload: 'submitted' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function resendVerficationCode() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(verificationCodeURL, getConfig());
      dispatch({ type: 'VERIFICATION_CODE_SENT', payload: '' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function verifyPhoneNumber(code) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().patch(phoneNumberURL, { code }, getConfig());
      dispatch({ type: 'VERIFY_PHONE_NUMBER', payload: 'verified' });
    } catch (e) {
      console.log({ e });
      dispatch({ type: 'VERIFY_PHONE_NUMBER', payload: 'verificationFailed' });
    }
  };
}

export function deletePhoneNumber() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().delete(phoneNumberURL, getConfig());
      dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'removed' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getPersonalInfo() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(personalInfoURL, getConfig());
      dispatch({ type: 'GET_USER', payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function postPersonalInfo(userData, profilePicture) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(personalInfoURL, userData, getConfig());

      if (profilePicture) {
        const formData = new FormData();
        formData.append('profilePic', profilePicture);
        await axiosInstance().post(profilePicURL, formData, getConfig());
      }

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
      console.log({ photos })
      const { data } = await axiosInstance().post(ownerURL(id), ownerData, getConfig());

      // this should run only after new cat record is saved
      if (data) {
        try {
          photos.forEach(async ({ file }, index) => {
            if (file) {
              console.log({ file })
              const formData = new FormData();
              formData.append('catPhoto', file);
              formData.append('fieldArrayIndex', index)

              await axiosInstance().post(catImageURL, formData, getCatConfig());
            }
          })
        } catch (e) {
          console.log({ e });
        }
      }

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

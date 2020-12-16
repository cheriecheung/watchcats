import axios from 'axios'
import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'
import { getConfig } from '../../utility/api'
import AccountActionTypes from './actionTypes'
import ErrorTypes from '../error/actionTypes'

const contactDetailsURL = `/contact-details`;
const notificationURL = `/notification`
const phoneNumberURL = `/phone-number`;
const verificationCodeURL = `/verification-code`;
const personalInfoURL = `/personal-info`;
const imageURL = `/image`;
const profilePicURL = `/image/profile-picture`;

const sitterURL = `/sitter/account`
const ownerURL = `/owner/account`
const catImageURL = `/image/cat`

export function uploadTestPicture(profilePicture) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('test_picture', profilePicture);
      await axios.post(`https://localhost:5000/image/test-picture`, formData, getConfig());
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getContactDetails() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(contactDetailsURL, getConfig());
      dispatch({ type: AccountActionTypes.CONTACT_DETAILS_RETURNED, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function changeNotification(contactType) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(notificationURL, { contactType }, getConfig());
      dispatch({ type: AccountActionTypes.NOTIFICATION_SETTINGS_CHANGED, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}


export function submitPhoneNumber(phone) {
  return async (dispatch) => {
    try {
      await axiosInstance().post(phoneNumberURL, { phone }, getConfig());
      dispatch({ type: AccountActionTypes.PHONE_NUMBER_SUBMITTED, payload: 'verifyToSave' });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      // dispatch({ type: AccountActionTypes.ERROR_OCCURED, payload: data });
      dispatch({ type: ErrorTypes.ACCOUNT_ERROR, payload: data });
    }
  };
}

export function resendOtpToInputtedPhoneNumber(phone) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(verificationCodeURL, { phone }, getConfig());
      dispatch({ type: AccountActionTypes.VERIFICATION_CODE_SENT });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function sendOtpToSavedPhoneNumber() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().post(verificationCodeURL, getConfig());
      dispatch({ type: AccountActionTypes.VERIFICATION_CODE_SENT });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function verifyPhoneNumber(code, phone) {
  return async (dispatch) => {
    try {
      await axiosInstance().patch(phoneNumberURL, { code, phone }, getConfig());
      dispatch({ type: AccountActionTypes.VERIFY_PHONE_NUMBER, payload: 'verified' });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      // dispatch({ type: AccountActionTypes.ERROR_OCCURED, payload: data });
      dispatch({ type: ErrorTypes.ACCOUNT_ERROR, payload: data });
    }
  };
}

export function deletePhoneNumber(otp) {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().delete(phoneNumberURL, { ...getConfig(), data: { otp } });
      dispatch({ type: AccountActionTypes.PHONE_NUMBER_DELETED, payload: 'removed' });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorTypes.ACCOUNT_ERROR, payload: data });

    }
  };
}

export function getPersonalInfo() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(personalInfoURL, getConfig());
      dispatch({ type: AccountActionTypes.GET_USER, payload: data });
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

      dispatch({ type: AccountActionTypes.GENERAL_INFO_SAVED, payload: data });
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
      dispatch({ type: AccountActionTypes.PROFILE_PIC_REMOVED, payload: 'removed' });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getSitterAccount() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(sitterURL, getConfig());
      dispatch({ type: AccountActionTypes.GET_SITTER_ACCOUNT, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function saveSitter(sitterData) {
  return async (dispatch) => {
    try {
      const data = await axiosInstance().post(sitterURL, sitterData, getConfig());
      dispatch({ type: AccountActionTypes.SITTER_ACCOUNT_SAVED, payload: data });
    } catch (e) {
      console.log({ e });
    }
  };
}

export function getOwnerAccount() {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance().get(ownerURL, getConfig());
      dispatch({ type: AccountActionTypes.GET_OWNER_ACCOUNT, payload: data });
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
      'content-type': undefined
    },
  }
}

export function saveOwner(ownerData, photos) {
  return async (dispatch) => {
    try {
      console.log({ photos })
      const { data } = await axiosInstance().post(ownerURL, ownerData, getConfig());

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

      dispatch({ type: AccountActionTypes.OWNER_ACCOUNT_SAVED, payload: data });
    } catch (e) {
      console.log({ eSaveOwner: e.response });
    }
  };
}

export function removeCatPhoto(filename, index) {
  return async (dispatch) => {
    try {
      await axiosInstance().delete(catImageURL, { ...getConfig(), data: { filename } });
      dispatch({ type: AccountActionTypes.CAT_PIC_REMOVED, payload: index });
    } catch (e) {
      console.log({ e });
    }
  };
}

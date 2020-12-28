import axios from 'axios'
import axiosInstance from '../../utility/axiosInstance';
import { getAccessToken } from '../../utility/accessToken'
import { getConfig } from '../../utility/api'
import AccountActionTypes from './actionTypes'
import ErrorActionTypes from '../error/actionTypes'
import LoadingActionTypes from '../loading/actionTypes'
import { clearLoading } from '../loading/actions'

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
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_ACCOUNT_ERROR, payload: data })
    }
  };
}


export function submitPhoneNumber(phone) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/SUBMIT_PHONE_NUMBER' });

    try {
      await axiosInstance().post(phoneNumberURL, { phone }, getConfig());
      dispatch({ type: AccountActionTypes.PHONE_NUMBER_SUBMITTED, payload: 'verifyToSave' });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_ACCOUNT_ERROR, payload: data });
      dispatch(clearLoading('accountLoading'))
    }
  };
}

export function resendOtpToInputtedPhoneNumber(phone) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/SEND_SMS_OTP' });

    try {
      await axiosInstance().post(verificationCodeURL, { phone }, getConfig());
      dispatch({ type: AccountActionTypes.VERIFICATION_CODE_SENT });
      dispatch(clearLoading('accountLoading'))
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('accountLoading'))
    }
  };
}

export function sendOtpToSavedPhoneNumber(isResend) {
  return async (dispatch) => {
    if (isResend) {
      dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/SEND_SMS_OTP' });
    }

    try {
      await axiosInstance().patch(verificationCodeURL, getConfig());
      dispatch({ type: AccountActionTypes.VERIFICATION_CODE_SENT });
      dispatch(clearLoading('accountLoading'))
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('accountLoading'))
    }
  };
}

export function verifyPhoneNumber(code, phone) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/VERIFY_PHONE_NUMBER' });

    try {
      await axiosInstance().patch(phoneNumberURL, { code, phone }, getConfig());
      dispatch({ type: AccountActionTypes.VERIFY_PHONE_NUMBER, payload: 'verified' });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_ACCOUNT_ERROR, payload: data });
      dispatch(clearLoading('accountLoading'))
    }
  };
}

export function deletePhoneNumber(otp) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/VERIFY_PHONE_NUMBER' });

    try {
      await axiosInstance().delete(phoneNumberURL, { ...getConfig(), data: { otp } });
      dispatch({ type: AccountActionTypes.PHONE_NUMBER_DELETED, payload: 'removed' });
    } catch (e) {
      console.log({ e });
      const { response } = e
      const { data } = response || {}
      dispatch({ type: ErrorActionTypes.SET_ACCOUNT_ERROR, payload: data });
      dispatch(clearLoading('accountLoading'))
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
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/SAVE_PERSONAL_INFO' });

    try {
      const { data } = await axiosInstance().post(personalInfoURL, userData, getConfig());

      if (profilePicture) {
        const formData = new FormData();
        formData.append('profilePic', profilePicture);
        await axiosInstance().post(profilePicURL, formData, getConfig());
      }
      dispatch(clearLoading('accountLoading'))
      dispatch({ type: AccountActionTypes.PERSONAL_INFO_SAVED, payload: data });
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('accountLoading'))
    }
  };
}

export function removeProfilePicture(filename) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/REMOVE_PROFILE_PICTURE' });

    try {
      await axiosInstance().delete(imageURL, { ...getConfig(), data: { filename } });
      dispatch({ type: AccountActionTypes.PROFILE_PIC_REMOVED, payload: 'removed' });
      dispatch(clearLoading('accountLoading'))
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('accountLoading'))
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
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/SAVE_SITTER' });

    try {
      const data = await axiosInstance().post(sitterURL, sitterData, getConfig());
      dispatch({ type: AccountActionTypes.SITTER_ACCOUNT_SAVED, payload: data });
      dispatch(clearLoading('accountLoading'))
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('accountLoading'))
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
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/SAVE_OWNER' });

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
      dispatch(clearLoading('accountLoading'))
    } catch (e) {
      console.log({ eSaveOwner: e.response });
      dispatch(clearLoading('accountLoading'))
    }
  };
}

export function removeCatPhoto(filename, index) {
  return async (dispatch) => {
    dispatch({ type: LoadingActionTypes.SET_ACCOUNT_LOADING, payload: 'LOADING/REMOVE_CAT_PHOTO' });

    try {
      await axiosInstance().delete(catImageURL, { ...getConfig(), data: { filename } });
      dispatch({ type: AccountActionTypes.CAT_PIC_REMOVED, payload: index });
      dispatch(clearLoading('accountLoading'))
    } catch (e) {
      console.log({ e });
      dispatch(clearLoading('accountLoading'))
    }
  };
}

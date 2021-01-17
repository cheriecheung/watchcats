import Immutable from 'seamless-immutable';
import AccountActionTypes from './actionTypes'

const initialState = Immutable({
  changePhoneNumberStep: 'input',
  name: '',
  email: '',
  getSmsNotification: false,
  getEmailNotification: false,
  phone: '',
  hasSetUpStripAccount: false,
  isDemoUser: false,
  isTwoFactorEnabled: false,
  isGoogleLogin: false,
});

const account_reducer = {
  account: (state = initialState, action) => {
    switch (action.type) {
      case AccountActionTypes.CONTACT_DETAILS_RETURNED:
        return { ...state, ...action.payload };
      case AccountActionTypes.NOTIFICATION_SETTINGS_CHANGED:
        return { ...state, ...action.payload };
      case AccountActionTypes.VERIFICATION_CODE_SENT:
        return { ...state }
      // rename
      case AccountActionTypes.PHONE_NUMBER_SUBMITTED:
        return { ...state, changePhoneNumberStep: action.payload }
      case AccountActionTypes.VERIFY_PHONE_NUMBER:
        return { ...state, changePhoneNumberStep: action.payload }
      case AccountActionTypes.PHONE_NUMBER_DELETED:
        return { ...state, changePhoneNumberStep: action.payload, phone: '' };
      case AccountActionTypes.TWO_FACTOR_ENABLED:
        return { ...state, isTwoFactorEnabled: true };
      case AccountActionTypes.TWO_FACTOR_DISABLED:
        return { ...state, isTwoFactorEnabled: false };
      case AccountActionTypes.GET_PERSONAL_INFO:
        return { ...state, data: action.payload };
      case AccountActionTypes.PERSONAL_INFO_SAVED:
        return { ...state, personalInfoSaved: action.payload };
      case AccountActionTypes.PROFILE_PIC_REMOVED:
        return { ...state, profilePicRemoved: action.payload }
      case AccountActionTypes.SITTER_ACCOUNT_SAVED:
        return { ...state, sitterSaved: action.payload };
      case AccountActionTypes.OWNER_ACCOUNT_SAVED:
        return { ...state, ownerSaved: action.payload };
      case AccountActionTypes.GET_SITTER_ACCOUNT:
        return { ...state, sitterData: action.payload };
      case AccountActionTypes.GET_OWNER_ACCOUNT:
        return { ...state, ownerData: action.payload };
      case AccountActionTypes.CAT_PIC_REMOVED:
        return { ...state, catPhotoRemoved: { index: action.payload } }
      default:
        return state;
    }
  }
}


export default account_reducer;
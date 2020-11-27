import Immutable from 'seamless-immutable';

const initialState = Immutable({
  changePhoneNumberStep: 'input',
  email: '',
  getEmailNotifiation: '',
  phone: '',
  changePhoneNotifiation: ''
});

const accountReducer = {
  account: (state = initialState, action) => {
    switch (action.type) {
      case 'CONTACT_DETAILS_RETURNED':
        return { ...state, ...action.payload };
      case 'NOTIFICATION_SETTINGS_CHANGED':
        return { ...state, ...action.payload };
      case 'PHONE_NUMBER_SUBMITTED':
        return { ...state, changePhoneNumberStep: action.payload }
      case 'VERIFY_PHONE_NUMBER':
        return { ...state, changePhoneNumberStep: action.payload }
      case 'PHONE_NUMBER_DELETED':
        return { ...state, changePhoneNumberStep: action.payload };
      case 'GET_USER':
        return { ...state, data: action.payload };
      case 'GENERAL_INFO_SAVED':
        return { ...state, generalInfo: action.payload };
      case 'SITTER_ACCOUNT_SAVED':
        return { ...state, sitter: action.payload };
      case 'OWNER_ACCOUNT_SAVED':
        return { ...state, ownerSaved: action.payload };
      case 'GET_SITTER_ACCOUNT':
        return { ...state, sitterData: action.payload };
      case 'GET_OWNER_ACCOUNT':
        return { ...state, ownerData: action.payload };
      // case 'SAVE_CAT_PIC':
      //   return { ownerCompleteSave: action.payload }
      case 'PROFILE_PIC_REMOVED':
        return { ...state, profilePicRemoved: action.payload }
      case 'CAT_PIC_REMOVED':
        return { ...state, catPhotoRemoved: { index: action.payload } }
      default:
        return state;
    }
  }
}


export default accountReducer;
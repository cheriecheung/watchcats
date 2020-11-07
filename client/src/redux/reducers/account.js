import Immutable from 'seamless-immutable';

const initialState = Immutable({
  verifyPhone: false,
  phoneVerified: null
});

const accountReducer = {
  account: (state = initialState, action) => {
    switch (action.type) {
      case 'CONTACT_DETAILS_RETURNED':
        return { ...state, contactDetails: action.payload };
      case 'PHONE_NUMBER_SUBMITTED':
        return { ...state, verifyPhone: true }
      case 'PHONE_NUMBER_VERIFY_SUCCESS':
        return { ...state, phoneVerified: 'et3523353' }
      case 'PHONE_NUMBER_REMOVED':
        return state;
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
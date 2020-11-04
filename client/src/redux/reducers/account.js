export function account(state = {}, action) {
  switch (action.type) {
    case 'CONTACT_DETAILS_RETURNED':
      return { contactDetails: action.payload };
    case 'GET_USER':
      return { data: action.payload };
    case 'GENERAL_INFO_SAVED':
      return { generalInfo: action.payload };
    case 'SITTER_ACCOUNT_SAVED':
      return { sitter: action.payload };
    case 'OWNER_ACCOUNT_SAVED':
      return { ownerSaved: action.payload };
    case 'GET_SITTER_ACCOUNT':
      return { sitterData: action.payload };
    case 'GET_OWNER_ACCOUNT':
      return { ownerData: action.payload };
    // case 'SAVE_CAT_PIC':
    //   return { ownerCompleteSave: action.payload }
    case 'PROFILE_PIC_REMOVED':
      return { profilePicRemoved: action.payload }
    case 'CAT_PIC_REMOVED':
      return { catPhotoRemoved: { index: action.payload } }
    default:
      return state;
  }
}

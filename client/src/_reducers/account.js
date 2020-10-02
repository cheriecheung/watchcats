export function account(state = {}, action) {
  switch (action.type) {
    case 'GET_USER':
      return { data: action.payload };
    case 'GENERAL_INFO_SAVED':
      return { generalInfo: action.payload };
    case 'SITTER_ACCOUNT_SAVED':
      return { sitter: action.payload };
    case 'OWNER_ACCOUNT_SAVED':
      return { owner: action.payload };
    case 'GET_SITTER_ACCOUNT':
      return { sitterData: action.payload };
    case 'GET_OWNER_ACCOUNT':
      return { ownerData: action.payload };

    default:
      return state;
  }
}

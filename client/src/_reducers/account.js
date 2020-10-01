export function account(state = {}, action) {
  switch (action.type) {
    case 'GENERAL_INFO_SAVED':
      return { generalInfo: action.payload };
    case 'SITTER_ACCOUNT_SAVED':
      return { sitter: action.payload };
    case 'OWNER_ACCOUNT_SAVED':
      return { owner: action.payload };
    case 'GET_SITTER_ACCOUNT':
      return { sitter: action.payload };
    case 'GET_USER':
      return { data: action.payload };
    default:
      return state;
  }
}

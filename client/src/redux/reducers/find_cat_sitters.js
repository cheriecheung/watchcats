export function find_cat_sitters(state = {}, action) {
  switch (action.type) {
    case 'GET_ALL_SITTERS':
    case 'GET_FILTERED_SITTERS':
      return { sitters: action.payload };
    case 'GET_SITTERS_IN_BOUNDS':
      return { sitter_in_bounds: action.payload }
    default:
      return state;
  }
}

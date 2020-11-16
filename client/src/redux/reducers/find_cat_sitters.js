import Immutable from 'seamless-immutable';

const initialState = Immutable({
  totalResults: 0,
  paginatedResults: []
});

const findCatsReducer = {
  find_cat_sitters: (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_SITTERS':
      case 'GET_FILTERED_SITTERS':
        return { sitters: action.payload };
      case 'GET_SITTERS_IN_BOUNDS':
        return {
          ...state,
          totalResults: action.payload.totalResults,
          paginatedResults: action.payload.paginatedResults
        }
      default:
        return state;
    }
  }
}

export default findCatsReducer
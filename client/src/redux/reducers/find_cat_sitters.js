import Immutable from 'seamless-immutable';

const initialState = Immutable({
  totalResults: 0,
  paginatedResults: []
});

const findCatsReducer = {
  find_cat_sitters: (state = initialState, action) => {
    switch (action.type) {
      case 'GET_SITTERS_IN_BOUNDS':
        return { ...state, ...action.payload }
      default:
        return state;
    }
  }
}

export default findCatsReducer
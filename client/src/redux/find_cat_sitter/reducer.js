import Immutable from 'seamless-immutable';
import FindCatSitterActionTypes from './actionTypes'

const initialState = Immutable({
  totalResults: 0,
  paginatedResults: []
});

const find_cat_sitter_reducer = {
  find_cat_sitter: (state = initialState, action) => {
    switch (action.type) {
      case FindCatSitterActionTypes.GET_SITTERS_IN_BOUNDS:
        return { ...state, ...action.payload }
      default:
        return state;
    }
  }
}

export default find_cat_sitter_reducer
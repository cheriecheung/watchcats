import Immutable from 'seamless-immutable';
import FindCatSitterActionTypes from './actionTypes'

const initialState = Immutable({
  totalResults: null,
  paginatedResults: []
});

const find_cat_sitter_reducer = {
  find_cat_sitter: (state = initialState, action) => {
    switch (action.type) {
      case FindCatSitterActionTypes.GET_SITTERS_IN_BOUNDS:
        return { ...state, ...action.payload }
      case FindCatSitterActionTypes.SET_INITIAL_STATE:
        return initialState
      default:
        return state;
    }
  }
}

export default find_cat_sitter_reducer
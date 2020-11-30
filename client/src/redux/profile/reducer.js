import Immutable from 'seamless-immutable';
import ProfileActionTypes from './actionTypes'

const profile_reducer = {
  profile: (state = {}, action) => {
    switch (action.type) {
      case ProfileActionTypes.GET_PROFILE:
        return { data: action.payload };
      default:
        return state;
    }
  }
}

export default profile_reducer
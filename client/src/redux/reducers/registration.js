import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const registrationReducer = {
  registration: (state = {}, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        return {};
      case REGISTER_FAIL:
        return {};
      default:
        return state;
    }
  }
}

export default registrationReducer
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../_actions/types';

export function registration(state = {}, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_FAIL:
      return {};
    default:
      return state;
  }
}

import Immutable from 'seamless-immutable';
import AppActionTypes from './actionTypes'

const initialState = Immutable({
  language: 'en',
  isLoggedIn: false,
  toggleMobileMenu: false
});

const app_reducer = {
  app: (state = initialState, action) => {
    switch (action.type) {
      case AppActionTypes.CHANGE_LANGUAGE:
        return { ...state, language: action.payload };
      case AppActionTypes.TOGGLE_MOBILE_MENU:
        return { ...state, toggleMobileMenu: action.payload }
      default:
        return state;
    }
  }
}

export default app_reducer
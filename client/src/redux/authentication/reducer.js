import Immutable from 'seamless-immutable';
import AuthActionTypes from './actionTypes'

const initialState = Immutable({
  loginByPhone: false,
});

const authentication_reducer = {
  authentication: (state = initialState, action) => {
    switch (action.type) {
      case AuthActionTypes.GOOGLE_LOGIN:
        return (window.location = action.payload);
      case AuthActionTypes.GOOGLE_LOGIN_SUCCESS:
        return 'login success';
      case AuthActionTypes.LOGIN_SUCCESS:
        return { loggedIn: true };
      case AuthActionTypes.PHONE_LOGIN:
        return { loginByPhone: action.payload }
      case AuthActionTypes.LOGOUT_SUCCESS:
        return window.location = '/login';
      case AuthActionTypes.VERIFY_SUCCESS:
      case AuthActionTypes.VERIFY_FAIL:
        return { payload: action.payload };
      default:
        return state;
    }
  }
}

export default authentication_reducer;
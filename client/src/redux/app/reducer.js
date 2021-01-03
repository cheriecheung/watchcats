import Immutable from 'seamless-immutable';
import AppActionTypes from './actionTypes'

const initialState = Immutable({
  appActionStatus: '',
  language: 'en',
  toggleMobileMenu: false,
  bookingsNotifications: {
    hasUnread: false,
    unreadAsOwner: {},
    unreadAsSitter: {}
  },
  chatsNotifications: {
    hasUnread: false
  },
  qrCode: ''
});

const app_reducer = {
  app: (state = initialState, action) => {
    switch (action.type) {
      case AppActionTypes.CLEAR_STATUS:
        return { ...state, appActionStatus: '' }
      case AppActionTypes.GET_NOTIFICATIONS:
        console.log({ payload: action.payload })
        return {
          ...state,
          bookingsNotifications: action.payload.bookings,
          chatsNotifications: action.payload.chats,
        }
      case AppActionTypes.CHANGE_LANGUAGE:
        return { ...state, language: action.payload };
      case AppActionTypes.TOGGLE_MOBILE_MENU:
        return { ...state, toggleMobileMenu: action.payload }
      case AppActionTypes.REGISTRATION_SUCCESSFUL:
        return { ...state, appActionStatus: 'registrationSuccess' }
      case AppActionTypes.FORGOT_PASSWORD_RESET:
        return { ...state, appActionStatus: 'resetForgotPasswordSuccess' }
      case AppActionTypes.PASSWORD_RESET_EMAIL_REQUESTED:
        return { ...state, appActionStatus: 'resetPasswordEmailRequested' }
      case AppActionTypes.PASSWORD_RESET:
        return { ...state, appActionStatus: 'resetPasswordSuccess' }
      case AppActionTypes.QR_CODE_RETURNED:
        return { ...state, qrCode: action.payload }
      case AppActionTypes.TWO_FACTOR_ENABLED:
        return { ...state, appActionStatus: 'enable2FASuccess' }
      case AppActionTypes.TWO_FACTOR_DISABLED:
        return { ...state, appActionStatus: 'disable2FASuccess' }
      default:
        return state;
    }
  }
}

export default app_reducer
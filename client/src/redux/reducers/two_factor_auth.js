import Immutable from 'seamless-immutable';

const initialState = Immutable({
  qrCode: '',
  isActivated: false,
});

const twoFactorAuthenticationReducer = {
  two_factor_auth: (state = initialState, action) => {
    switch (action.type) {
      case 'QR_CODE_RETURNED':
        return { ...state, qrCode: action.payload }
      case 'TWO_FACTOR_ACTIVATED':
        return { ...state, isActivated: true }
      case 'TWO_FACTOR_DISABLED':
        return { ...state, isActivated: false }
      default:
        return state;
    }
  }
}

export default twoFactorAuthenticationReducer;
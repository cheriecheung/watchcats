export function two_factor_auth(state = {}, action) {
  switch (action.type) {
    case 'QR_CODE_RETURNED':
      return { qrCode: action.payload }
    default:
      return state;
  }
}
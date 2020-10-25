const initialSession = { userId: null, username: null };
export function session(state = initialSession, { type, userId }) {
  Object.freeze(state);
  switch (type) {
    case 'GOOGLE_LOGIN_SUCCESS':
      return userId;
    case 'LOGOUT':
      return initialSession;
    default:
      return state;
  }
}

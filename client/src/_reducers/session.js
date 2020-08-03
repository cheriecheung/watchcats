const initialSession = { userId: null, username: null };
export function session(state = initialSession, { type, user }) {
  Object.freeze(state);
  switch (type) {
    case 'GOOGLE_LOGIN_SUCCESS':
      return user;
    case 'LOGOUT':
      return initialSession;
    default:
      return state;
  }
}

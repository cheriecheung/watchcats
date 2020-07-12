import axios from 'axios';

const action = {
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',

  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  LOGOUT: 'LOGOUT',
};

function login(email, password) {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, {
        email,
        password,
      })
      .then(({ data: { token, user } }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);

        dispatch({ type: action.LOGIN_SUCCESS, user });
        window.location = '/account';
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: action.LOGIN_FAILURE, err });
      });
  };
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location = '/';

  return { type: action.LOGOUT };
}

// async function registration(firstName, lastName, email, password) {
//   const data = await axios.post(
//     `${process.env.REACT_APP_API_DOMAIN}/auth/register`,
//     {
//       name: `${firstName} ${lastName}`,
//       email,
//       password,
//     }
//   );

//   return data;
// }

export const userActions = {
  action,
  login,
  logout,
};

import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from './types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export async function checkLoggedIn() {
  axios
    .get(`${process.env.REACT_APP_API_DOMAIN}/auth/checkloggedIn`, {
      withCredentials: true,
      // credentials: 'include',
    })
    .then((response) => {
      console.log(response);
      const preloadedState = {
        session: response.data,
      };
      return preloadedState;
    })
    .catch((error) => {
      window.location = '/';
      console.log(error);
    });
}

export function googleLogin() {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/auth/googlelogin`)
      .then(({ data: authenticationURI }) => {
        dispatch({
          type: 'GOOGLE_LOGIN',
          payload: authenticationURI,
        });
      })
      .catch((error) => console.log(error.response));
  };
}

export function googleAuthenticate() {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/auth/getUser`, {
        withCredentials: true,
        // credentials: 'include',
      })
      .then(({ data: { sid, user } }) => {
        console.log({ sid, user });
        cookies.set('sessionId', sid);
        //window.location = '/account';
        dispatch({ type: 'GOOGLE_LOGIN_SUCCESS', user });
      })
      .catch((error) => {
        window.location = '/';
        console.log(error);
      });
  };
}

export function registration(firstName, lastName, email, password) {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/user/register`, {
        name: `${firstName} ${lastName}`,
        email,
        password,
      })
      .then((data) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload:
            'Registration successful. Please log into your email to activate your account.',
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTER_FAIL,
          payload: 'Registration fail. Please try again',
        });
      });
  };
}

export function verifyEmail(token) {
  return (dispatch) => {
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/auth/activate-account
    `,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        dispatch({
          type: VERIFY_SUCCESS,
          payload: 'Email verification successful! You can now log in',
        });
      })
      .catch((err) => {
        dispatch({
          type: VERIFY_FAIL,
          payload: err.response.data,
          status: err.response.status,
        });
      });
  };
}

export function getVerificationLink() {}

export function login(email, password) {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, {
        email,
        password,
      })
      .then(({ data: { token, user } }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);

        dispatch({ type: LOGIN_SUCCESS, user });
        window.location = '/account';
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: LOGIN_FAIL,
          payload: "Email and password combination isn't valid",
        });
      });
  };
}

export function userlogout() {
  return (dispatch) => {
    axios
      .delete(`${process.env.REACT_APP_API_DOMAIN}/auth/userlogout`)
      .then((data) => {
        console.log(data);
        // localStorage.clear();
        dispatch({ type: LOGOUT_SUCCESS });
        window.location = '/';
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: LOGOUT_FAIL, err });
      });
  };
}

// export function logout() {
//   const token = localStorage.getItem('token');

//   return (dispatch) => {
//     axios
//       .post(
//         `${process.env.REACT_APP_API_DOMAIN}/auth/logout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((data) => {
//         console.log(data);
//         localStorage.clear();
//         dispatch({ type: LOGOUT_SUCCESS });
//         window.location = '/';
//       })
//       .catch((err) => {
//         console.log(err.response);
//         dispatch({ type: LOGOUT_FAIL, err });
//       });
//   };
// }

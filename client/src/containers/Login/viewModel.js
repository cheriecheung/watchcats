import { useDispatch, useSelector } from 'react-redux';
import { login, googleLogin, googleAuthenticate, phoneLogin } from '../../redux/actions/authenticationActions';

function useLogin() {
  const dispatch = useDispatch();
  const { errorMessage, loginByPhone } = useSelector((state) => state.authentication);

  function onLogin(data) {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  function onGoogleLogin() {
    dispatch(googleLogin());
  }

  function onGoogleAuthenticate() {
    dispatch(googleAuthenticate());
  }

  function onPhoneLogin(data) {
    dispatch(phoneLogin(data));
  }

  return {
    onLogin,
    onGoogleLogin,
    onGoogleAuthenticate,
    onPhoneLogin,
    errorMessage,
    loginByPhone,
  }
}

export { useLogin }

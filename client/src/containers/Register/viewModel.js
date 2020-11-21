import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { registration, googleLogin, googleAuthenticate } from '../../redux/actions/authenticationActions';

function useRegister() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  // const { } = useSelector((state) => state.authentication);

  function onRegister(data) {
    const { firstName, lastName, email, password } = data;
    dispatch(registration(firstName, lastName, email, password));
  };

  function onGoogleLogin() {
    dispatch(googleLogin());
  }

  function onGoogleAuthenticate() {
    dispatch(googleAuthenticate());
  }

  return {
    t,
    onRegister,
    onGoogleLogin,
    onGoogleAuthenticate,
  }
}

export { useRegister }

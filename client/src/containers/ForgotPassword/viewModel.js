import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetEmail, resetPassword } from '../../redux/actions'

function useForgotPassword() {
  const dispatch = useDispatch();
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  function onSubmitEmail(data) {
    const { email } = data;
    dispatch(getPasswordResetEmail(email))
    setEmailSubmitted(true)
  }

  function onSubmitNewPassword(data) {
    const { newPassword } = data;
    dispatch(resetPassword(newPassword))
  }

  return {
    emailSubmitted,
    onSubmitEmail,
    onSubmitNewPassword
  }
}

export { useForgotPassword }
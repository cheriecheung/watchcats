import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../../redux/actions/authenticationActions';

import Requested from './containers/Requested'
import Successful from './containers/Successful'
import Unsuccessful from './containers/Unsuccessful'

function EmailVerification() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const activate = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  useEffect(() => {
    console.log({ activate, payload: activate.payload })
  }, [activate])

  const renderResponse = () => {
    switch (activate.payload) {
      case 'Activation failed':
        return <Unsuccessful />
      case 'Activation successful':
        return <Successful />
      case 'Email requested':
        return <Requested />
      default:
        break;
    }
  }

  return renderResponse();
}

export default EmailVerification;

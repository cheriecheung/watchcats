import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { googleAuthenticate } from '../../../redux/actions/authenticationActions';

function Loading() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(googleAuthenticate());
  }, [googleAuthenticate]);

  return <div>Loading...</div>;
}

export default Loading;

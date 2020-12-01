import React, { useEffect } from 'react';
import { useLogin } from '../viewModel'

function Loading() {
  const { t, onGoogleAuthenticate } = useLogin();

  useEffect(() => {
    onGoogleAuthenticate();
  }, [onGoogleAuthenticate]);

  return <div>Loading...</div>;
}

export default Loading;

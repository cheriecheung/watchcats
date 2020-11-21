import React, { useEffect } from 'react';
import { useRegister } from './viewModel';

function Loading() {
  const { onGoogleAuthenticate } = useRegister();

  useEffect(() => {
    onGoogleAuthenticate()
  }, [onGoogleAuthenticate]);

  return <div>Loading...</div>;
}

export default Loading;

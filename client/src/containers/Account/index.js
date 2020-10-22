import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Tabs from './Tabs';

function Account() {
  const authenticated = useSelector((state) => state.authentication);
  // const pageRef = useRef(null);

  useEffect(() => {
    if (window.scrollTo) window.scrollTo(0, 0);

    // window.scrollTo(0, pageRef.current.offsetTop);
  }, []);

  return (
    <div
      //ref={pageRef}
      style={{ maxWidth: 900, margin: '0 auto 50px auto' }}
    >
      <Tabs />
    </div>
  );
}

export default Account;

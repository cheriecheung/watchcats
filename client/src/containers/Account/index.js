import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';

function Account() {
  const authenticated = useSelector((state) => state.authentication);

  return (
    <>
      <Tabs />
    </>
  );
}

export default Account;

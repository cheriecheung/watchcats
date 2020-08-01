import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Account() {
  const authenticated = useSelector((state) => state.authentication);

  return <h2>Welcome back</h2>;
}

export default Account;

import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

function Loading() {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/auth/getUser`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    // if is not google login, redirect to homepage
  }, []);

  return <div>Loading...</div>;
}

export default Loading;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { googleAuthenticate } from '../../_actions/userActions';
import axios from 'axios';

function Loading() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(googleAuthenticate());
  }, []);

  return <div>Loading...</div>;
}

export default Loading;

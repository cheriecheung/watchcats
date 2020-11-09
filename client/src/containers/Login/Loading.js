import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { googleAuthenticate } from '../../redux/actions/authenticationActions';
import axios from 'axios';

function Loading() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(googleAuthenticate());
  }, [dispatch]);

  return <div>Loading...</div>;
}

export default Loading;

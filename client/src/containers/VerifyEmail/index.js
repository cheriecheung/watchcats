import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { verifyEmail } from '../../_actions/userActions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

function Home() {
  const { t, i18n } = useTranslation();
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, []);

  return (
    <>
      <p>
        Email verification successful! Click <Link to="/login">here</Link> to
        log in now.
      </p>
    </>
  );
}

export default Home;

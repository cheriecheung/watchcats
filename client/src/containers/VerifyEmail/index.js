import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { verifyEmail, getVerificationLink } from '../../_actions/userActions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const { t, i18n } = useTranslation();
  const { token } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch, token]);

  return (
    <>
      {auth.status === 401 ? (
        <p>
          Your verification link has expired. Please click
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              outline: 'none',
            }}
            //onClick={() => dispatch(getVerificationLink(token))}
          >
            here
          </button>
          to have a new verification link emailed to you.
        </p>
      ) : (
        <p>{auth.payload}</p>
      )}
    </>
  );
}

export default Home;

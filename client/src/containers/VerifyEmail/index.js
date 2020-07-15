import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

function Home() {
  const { t, i18n } = useTranslation();
  const { token } = useParams();

  useEffect(() => {
    console.log(token);
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

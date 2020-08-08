import React from 'react';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';

function Bookings() {
  return (
    <>
      <div style={{ textAlign: 'right', marginBottom: 10 }}>
        <Link to="/profile">View My Public Profile</Link>
      </div>
      <Tabs />
    </>
  );
}

export default Bookings;

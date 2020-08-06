import React from 'react';
import Tabs from './Tabs';
import { Link } from 'react-router-dom';

function Bookings() {
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <button style={{ background: 'none', border: 'none', marginRight: 10 }}>
          Cat sitter bookings
        </button>
        <button style={{ background: 'none', border: 'none', marginRight: 10 }}>
          Cat owner bookings
        </button>
      </div>
      <Tabs />
    </>
  );
}

export default Bookings;

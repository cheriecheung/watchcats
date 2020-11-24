import React from 'react';
import Item from '../Item';

function Declined({ t, bookings }) {
  return (
    <>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((data, index) =>
          <Item
            key={index} // data.id
            t={t}
            data={data}
          />
        )
      ) : (
          <span>You have no declined bookings at the moment</span>
        )}
    </>
  );
}

export default Declined;

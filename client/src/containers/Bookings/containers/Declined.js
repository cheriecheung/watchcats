import React from 'react';
import ItemCard from '../components/ItemCard';

function Declined({ t, bookings }) {
  return (
    <>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((data, index) =>
          <ItemCard
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

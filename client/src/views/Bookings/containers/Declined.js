import React from 'react';
import ItemCard from '../components/ItemCard';

function Declined({ t, bookings }) {
  return (
    <>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map(data => {
          const { id } = data || {}

          return (
            <ItemCard
              key={id}
              t={t}
              data={data}
            />
          )
        })
      ) : (
          <span>{t('bookings.no_service', { status: t('bookings.status_declined') })}</span>
        )}
    </>
  );
}

export default Declined;

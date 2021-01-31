import React from 'react';
import Icon from '../components/Icon';
import ItemCard from '../components/ItemCard';

function Declined({ t, bookings, bookingType }) {
  const type = bookingType === 'sitting_jobs' ? 'bookings.no_jobs' : 'bookings.no_service'

  return (
    <>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        bookings.map((data, index) => {
          const { id } = data || {}

          return (
            <ItemCard
              key={`${id}-${index}`}
              t={t}
              data={data}
              bookingType={bookingType}
            />
          )
        })
      ) : (
          <>
            <Icon />
            <span>
              {t(type, { status: t('bookings.declined').toLowerCase() })}
            </span>
          </>
        )}
    </>
  );
}

export default Declined;

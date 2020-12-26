import React from 'react';
import ItemCard from '../components/ItemCard';
import { LinkButton } from '../../../components/UIComponents';

function Completed({ t, bookingType, bookings }) {

  const renderActionButtons = (data, hasWrittenReview) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {hasWrittenReview ? (
        <h5>Show review here</h5>
      ) : (
          <LinkButton
            to={{
              pathname: `/writereivew/${data.id}`,
              state: { booking: { ...data, bookingType } }
            }}
          >
            {t('bookings.write_review')}
          </LinkButton>
        )
      }
    </div>
  );

  return (
    <>
      {Array.isArray(bookings) &&
        bookings.length > 0 &&
        bookings.map(data => {
          const { id } = data || {}

          return (
            <ItemCard
              key={id}
              t={t}
              data={data}
              renderActionButtons={renderActionButtons}
              status="completed"
            />
          );
        })}

      {bookingType === 'sitting_jobs' && bookings.length === 0 && (
        <span>{t('bookings.no_jobs', { status: t('bookings.status_completed') })}</span>
      )}

      {bookingType === 'sitting_service' && bookings.length === 0 && (
        <>
          <span>
            {t('bookings.no_service', { status: t('bookings.status_completed') })}
          </span>

          <span>
            {t('bookings.go_to')}
            <LinkButton to="/find">{t('header.find_sitter')}</LinkButton>
            {t('bookings.find_sitter')}
          </span>
        </>
      )}
    </>
  );
}

export default Completed;

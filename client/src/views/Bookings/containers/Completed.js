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
            variant="bordered"
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
              bookingType={bookingType}
              data={data}
              renderActionButtons={renderActionButtons}
              status="completed"
            />
          );
        })}

      {bookingType === 'sitting_jobs' && bookings.length === 0 && (
        <span>{t('bookings.no_jobs', { status: t('bookings.completed').toLowerCase() })}</span>
      )}

      {bookingType === 'sitting_service' && bookings.length === 0 && (
        <>
          <span>
            {t('bookings.no_service', { status: t('bookings.completed').toLowerCase() })}
          </span>

          <span>
            {t('bookings.go_to')}
            <LinkButton to="/find" style={{ fontWeight: 'bold' }}>
              &nbsp;{t('header.find_sitter')}&nbsp;
              </LinkButton>
            {t('bookings.find_sitter')}
          </span>
        </>
      )}
    </>
  );
}

export default Completed;

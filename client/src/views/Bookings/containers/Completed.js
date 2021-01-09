import React from 'react';
import { LinkButton } from '../../../components/UIComponents';
import Icon from '../components/Icon';
import ItemCard from '../components/ItemCard';

function Completed({ t, bookingType, bookings }) {
  const renderActionButtons = (id, hasReviewLeftByOwner, hasReviewLeftBySitter) => {

    const noReviewForOwner = bookingType === 'sitting_jobs' && !hasReviewLeftBySitter;
    const noReviewForSitter = bookingType === 'sitting_service' && !hasReviewLeftByOwner;

    const hasReviewForOwner = bookingType === 'sitting_jobs' && hasReviewLeftBySitter;
    const hasReviewForSitter = bookingType === 'sitting_service' && hasReviewLeftByOwner;

    const hasReviewFromOwner = bookingType === 'sitting_jobs' && hasReviewLeftByOwner;
    const hasReviewFromSitter = bookingType === 'sitting_service' && hasReviewLeftBySitter;

    return (
      <>
        {((noReviewForOwner) || (noReviewForSitter)) &&
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LinkButton
              to={`/write-reivew?booking=${id}`}
              variant="bordered"
            >
              {t('bookings.write_review')}
            </LinkButton>
          </div>
        }

        {((hasReviewForOwner) || (hasReviewForSitter)) &&
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}>

            <i className="fas fa-check fa-xs mr-2" style={{ alignSelf: 'center' }} />
            <span> You have left a review</span>
          </div>
        }

        {((hasReviewFromOwner) || (hasReviewFromSitter)) &&
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}>
            <i className="fas fa-check fa-xs mr-2" style={{ alignSelf: 'center' }} />
            <span>You have been left a review</span>
          </div>
        }
      </>
    )
  };

  const noSittingJobs = bookingType === 'sitting_jobs' && bookings.length === 0;
  const noSittingServices = bookingType === 'sitting_service' && bookings.length === 0;

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

      {noSittingJobs && (
        <>
          <Icon />
          <span>
            {t('bookings.no_jobs', { status: t('bookings.completed').toLowerCase() })}
          </span>
        </>
      )}

      {noSittingServices && (
        <>
          <Icon />
          <span>
            {t('bookings.no_service', { status: t('bookings.completed').toLowerCase() })}
          </span>

          <span>
            {t('bookings.go_to')}
            <LinkButton to="/find" variant="colored">
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

import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';

function Completed({ bookingType, bookings, t }) {
  const renderActionButtons = (hasWrittenReview, bookingId) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {!hasWrittenReview ? (
        <h5>Show review here</h5>
      ) : (
        <ActionButton
          backgroundColor="#FF5C4E"
          // use <Link> instead
          onClick={() => {
            window.location = `/writereivew/${bookingId}`;
          }}
        >
          {t('bookings.write_review')}
        </ActionButton>
      )}
    </div>
  );

  return (
    <>
      {Array.isArray(bookings) &&
        bookings.length > 0 &&
        bookings.map((data, index) => {
          // data.hasWrittenReview
          const hasWrittenReview = false;
          return (
            <Item
              data={data}
              renderActionButtons={() => renderActionButtons(hasWrittenReview, 123)}
            />
          );
        })}

      {bookingType === 'sitting_jobs' && bookings.length === 0 && (
        <span>You have no completed sitting jobs at the moment.</span>
      )}

      {bookingType === 'sitting_service' && bookings.length === 0 && (
        <span>
          You have no completed sitting service at the moment. Go to&nbsp;
          <Link to="/find">Find a cat sitter</Link> page to start looking for a cat sitter now!
        </span>
      )}
    </>
  );
}

export default Completed;

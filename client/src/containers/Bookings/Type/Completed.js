import React from 'react';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';

function Completed({ bookings, t }) {
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

  return bookings.map((data, index) => {
    // data.hasWrittenReview
    const hasWrittenReview = false;
    return (
      <Item data={data} renderActionButtons={() => renderActionButtons(hasWrittenReview, 123)} />
    );
  });
}

export default Completed;

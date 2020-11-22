import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item';
import { ButtonBordered } from '../../../components/UIComponents';
import { useTranslation } from 'react-i18next';

function Completed({ bookingType, bookings }) {
  const { t } = useTranslation();

  const renderActionButtons = (bookingId, hasWrittenReview) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {hasWrittenReview ? (
        <h5>Show review here</h5>
      ) : (
          <ButtonBordered
            backgroundColor="#FF5C4E"
            // use <Link> instead
            onClick={() => {
              window.location = `/writereivew/${bookingId}`;
            }}
          >
            {t('bookings.write_review')}
          </ButtonBordered>
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
              key={index} // data.id
              data={data}
              // renderActionButtons={() => renderActionButtons(hasWrittenReview, 123)}
              renderActionButtons={renderActionButtons}
              status="completed"
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

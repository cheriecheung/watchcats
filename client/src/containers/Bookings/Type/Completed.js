import React from 'react';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';

function Completed({ bookings, t }) {
  const renderActionButtons = (bookingId) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ActionButton
        backgroundColor="#FF5C4E"
        // use <Link> instead
        onClick={() => {
          window.location = `/Review/${bookingId}`;
        }}
      >
        {t('bookings.write_review')}
      </ActionButton>
    </div>
  );

  return bookings.map((data, index) => (
    <Item data={data} renderActionButtons={() => renderActionButtons(123)} />
  ));
}

export default Completed;

import React from 'react';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';

function Confirmed({
  bookingType,
  bookings,
  openModal,
  setModalContent,
  setConfirmActionType,
  setBookingId,
  t,
}) {
  const renderActionButtons = (hasPaid) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {hasPaid ? (
        <ActionButton
          backgroundColor="#9ACD32"
          onClick={() => {
            openModal();
            setModalContent(t('bookings.complete_confirm'));
          }}
        >
          {t('bookings.complete')}
        </ActionButton>
      ) : (
        <>
          <ActionButton
            backgroundColor="#FF5C4E"
            onClick={() => {
              openModal();
              setModalContent(t('bookings.cancel_confirm'));
            }}
          >
            {t('bookings.cancel')}
          </ActionButton>

          {bookingType === 'sitting_service' && <PayNowButton t={t} />}
        </>
      )}
    </div>
  );

  return bookings.map((data, index) => {
    // data.hasPaid
    const hasPaid = false;
    return (
      <Item
        data={data}
        openModal={openModal}
        renderActionButtons={() => renderActionButtons(hasPaid)}
      />
    );
  });
}

export default Confirmed;

function PayNowButton({ t }) {
  return (
    <ActionButton
      backgroundColor="#9ACD32"
      onClick={() => {
        alert('redirect to payment page');
      }}
    >
      {t('bookings.pay_now')}
    </ActionButton>
  );
}

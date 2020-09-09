import React from 'react';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';

function Confirmed({
  bookings,
  openModal,
  setModalContent,
  setConfirmActionType,
  setBookingId,
  t,
}) {
  const renderActionButtons = (isPaid) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {!isPaid ? (
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
          <ActionButton
            backgroundColor="#9ACD32"
            onClick={() => {
              alert('redirect to payment page');
            }}
          >
            {t('bookings.pay_now')}
          </ActionButton>
        </>
      ) : (
        <ActionButton
          backgroundColor="#9ACD32"
          onClick={() => {
            openModal();
            setModalContent(t('bookings.complete_confirm'));
          }}
        >
          {t('bookings.complete')}
        </ActionButton>
      )}
    </div>
  );

  return bookings.map((data, index) => {
    const isPaid = false;
    return (
      <Item
        data={data}
        openModal={openModal}
        renderActionButtons={() => renderActionButtons(isPaid)}
      />
    );
  });
}

export default Confirmed;

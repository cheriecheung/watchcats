import React from 'react';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';
import ReviewModalContent from '../ReviewModalContent';

function Completed({
  bookings,
  openModal,
  setModalContent,
  setConfirmActionType,
  setBookingId,
  t,
}) {
  const renderActionButtons = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ActionButton
        backgroundColor="#FF5C4E"
        onClick={() => {
          openModal();
          setModalContent(<ReviewModalContent />);
        }}
      >
        {t('bookings.write_review')}
      </ActionButton>
    </div>
  );

  return bookings.map((data, index) => (
    <Item data={data} openModal={openModal} renderActionButtons={renderActionButtons} />
  ));
}

export default Completed;

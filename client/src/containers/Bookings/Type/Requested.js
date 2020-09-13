import React from 'react';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';

function Requested({
  bookingType,
  bookings,
  openModal,
  setModalContent,
  setConfirmActionType,
  setBookingId,
  t,
}) {
  const renderActionButtons = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {bookingType === 'sitting_jobs' ? (
        <>
          <ActionButton
            backgroundColor="#FF5C4E"
            onClick={() => {
              openModal();
              setModalContent(t('bookings.decline_confirm'));
              setConfirmActionType('decline');
              setBookingId(2353);
            }}
          >
            {t('bookings.decline')}
          </ActionButton>
          <ActionButton
            backgroundColor="#FFAE42"
            onClick={() => {
              openModal();
              setModalContent(t('bookings.schedule_meetup_confirm'));
              setConfirmActionType('scheduleMeetup');
            }}
          >
            {t('bookings.schedule_meetup')}
          </ActionButton>
          <ActionButton
            backgroundColor="#9ACD32"
            onClick={() => {
              openModal();
              setModalContent(t('bookings.accept_confirm'));
              setConfirmActionType('accept');
            }}
          >
            {t('bookings.accept')}
          </ActionButton>
        </>
      ) : (
        <span>Currently waiting on reply from cat sitter</span>
      )}
    </div>
  );

  return (
    <>
      {bookings.map((data, index) => (
        <Item data={data} renderActionButtons={renderActionButtons} />
      ))}

      <br />
      <p>
        Remark: It is highly recommended to have a meet up session between you and cat owners before
        accepting their requests. Directly accepting a request is meant for owners you have
        previously completed bookings with.
      </p>
    </>
  );
}

export default Requested;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const renderSection = () =>
    bookingType === 'sitting_jobs' ? (
      <RequestedJob
        openModal={openModal}
        setModalContent={setModalContent}
        setConfirmActionType={setConfirmActionType}
        setBookingId={setBookingId}
        t={t}
      />
    ) : (
      <RequestedService />
    );

  return (
    <>
      {Array.isArray(bookings) &&
        bookings.length > 0 &&
        bookings.map((data, index) => (
          <Item data={data} renderSection={renderSection} bookingType={bookingType} />
        ))}

      {bookingType === 'sitting_jobs' && bookings.length === 0 && (
        <span>
          You have no requested sitting jobs at the moment. You will only receive sitting jobs
          requests when a cat sitter sends you want.
        </span>
      )}

      {bookingType === 'sitting_service' && bookings.length === 0 && (
        <span>
          You have no requested sitting service at the moment. Go to&nbsp;
          <Link to="/find">Find a cat sitter</Link> page to start looking for a cat sitter now!
        </span>
      )}
    </>
  );
}

export default Requested;

function RequestedJob({ openModal, setModalContent, setConfirmActionType, setBookingId, t }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
    </div>
  );
}

function RequestedService() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>Currently waiting on reply from cat sitter</span>
    </div>
  );
}

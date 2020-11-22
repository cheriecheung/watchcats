import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item';
import { ButtonBordered } from '../../../components/UIComponents';
import { useTranslation } from 'react-i18next';

function Requested({
  bookingType,
  bookings,
  openModal,
  setModalContent,
  setActionType,
  setBookingId,
}) {
  const renderSection = (id) =>
    bookingType === 'sitting_jobs' ? (
      <RequestedJob
        openModal={openModal}
        setModalContent={setModalContent}
        setActionType={setActionType}
        setBookingId={() => setBookingId(id)}
      />
    ) : (
        <RequestedService />
      );

  return (
    <>
      {Array.isArray(bookings) &&
        bookings.length > 0 &&
        bookings.map((data, index) => (
          <Item
            key={index} // data.id
            data={data}
            renderActionButtons={(id) => renderSection(id)}
            bookingType={bookingType}
            status='requested'
          />
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

function RequestedJob({ openModal, setModalContent, setActionType, setBookingId }) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ButtonBordered
        backgroundColor="#FF5C4E"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.decline_confirm'));
          setActionType('decline');
          setBookingId();
        }}
      >
        {t('bookings.decline')}
      </ButtonBordered>
      <ButtonBordered
        style={{ marginRight: 0 }}
        backgroundColor="#9ACD32"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.accept_confirm'));
          setActionType('accept');
          setBookingId();
        }}
      >
        {t('bookings.accept')}
      </ButtonBordered>
    </div>
  );
}

function RequestedService() {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>Currently waiting on reply from cat sitter</span>
    </div>
  );
}

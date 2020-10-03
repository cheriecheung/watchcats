import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';

function Confirmed({
  bookingType,
  // bookings,
  openModal,
  setModalContent,
  setConfirmActionType,
  setBookingId,
  t,
}) {
  const renderSection = (hasPaid) =>
    bookingType === 'sitting_jobs' ? (
      <ConfirmedJob
        hasPaid={hasPaid}
        openModal={openModal}
        setModalContent={setModalContent}
        setConfirmActionType={setConfirmActionType}
        setBookingId={setBookingId}
        t={t}
      />
    ) : (
      <ConfirmedService
        hasPaid={hasPaid}
        openModal={openModal}
        setModalContent={setModalContent}
        t={t}
      />
    );

  const bookings = [{}];

  return (
    <>
      {Array.isArray(bookings) &&
        bookings.length > 0 &&
        bookings.map((data, index) => {
          // data.hasPaid
          const hasPaid = false;
          return (
            <Item data={data} openModal={openModal} renderSection={() => renderSection(hasPaid)} />
          );
        })}

      {bookingType === 'sitting_jobs' && bookings.length === 0 && (
        <span>You have no confirmed sitting jobs at the moment.</span>
      )}

      {bookingType === 'sitting_service' && bookings.length === 0 && (
        <span>
          You have no confirmed sitting service at the moment. Go to&nbsp;
          <Link to="/find">Find a cat sitter</Link> page to start looking for a cat sitter now!
        </span>
      )}
    </>
  );
}

export default Confirmed;

function ConfirmedJob({ hasPaid, openModal, setModalContent, t }) {
  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ActionButton
        backgroundColor="#9ACD32"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.complete_confirm'));
        }}
      >
        {t('bookings.complete')}
      </ActionButton>
    </div>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>waiting for cat owner to pay</span>
    </div>
  );
}

function ConfirmedService({ hasPaid, openModal, setModalContent, t }) {
  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>waiting for cat sitter to confirm completion of sitting appointment</span>
    </div>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Link to="/payment">{t('bookings.pay_now')}</Link>
      {/* <ActionButton
        backgroundColor="#9ACD32"
        onClick={() => {
          alert('redirect to payment page');
        }}
      >
        {t('bookings.pay_now')}
      </ActionButton> */}
    </div>
  );
}

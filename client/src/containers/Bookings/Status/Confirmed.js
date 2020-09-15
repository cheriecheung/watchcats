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

  return bookings.map((data, index) => {
    // data.hasPaid
    const hasPaid = false;
    return <Item data={data} openModal={openModal} renderSection={() => renderSection(hasPaid)} />;
  });
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
      <ActionButton
        backgroundColor="#9ACD32"
        onClick={() => {
          alert('redirect to payment page');
        }}
      >
        {t('bookings.pay_now')}
      </ActionButton>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item';
import { ActionButton } from '../../../components/Bookings';
import { useTranslation } from 'react-i18next';

function Confirmed({
  bookingType,
  bookings,
  openModal,
  setModalContent,
  setConfirmActionType,
  setBookingId,
}) {
  const renderSection = (hasPaid) =>
    bookingType === 'sitting_jobs' ? (
      <ConfirmedJob
        hasPaid={hasPaid}
        openModal={openModal}
        setModalContent={setModalContent}
        setConfirmActionType={setConfirmActionType}
        setBookingId={setBookingId}
      />
    ) : (
        <ConfirmedService
          hasPaid={hasPaid}
          openModal={openModal}
          setModalContent={setModalContent}
        />
      );

  return (
    <>
      {Array.isArray(bookings) &&
        bookings.length > 0 &&
        bookings.map((data, index) => {
          // data.hasPaid
          const hasPaid = false;
          return (
            <Item
              key={index} // data.id
              data={data}
              openModal={openModal}
              renderSection={() => renderSection(hasPaid)}
              status="confirmed"
            />
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

function ConfirmedJob({ hasPaid, openModal, setModalContent, }) {
  const { t } = useTranslation();

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

function ConfirmedService({ hasPaid, openModal, setModalContent }) {
  const { t } = useTranslation();

  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>waiting for cat sitter to confirm completion of sitting appointment</span>
    </div>
  ) : (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {/* <Link to="/payment" >{t('bookings.pay_now')}</Link> */}
        <Link to={{ pathname: '/payment', state: { stripeAccountId: 'acct_1HYCiyART4JEToPd' } }}>
          {t('bookings.pay_now')}
        </Link>

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

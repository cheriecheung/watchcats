import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item';
import { LinkButton, OutlinedButton } from '../../../components/UIComponents';
import { useTranslation } from 'react-i18next';

function Confirmed({
  t,
  bookingType,
  bookings,
  openModal,
  setModalContent,
  setActionType,
  setBookingId,
}) {
  const renderActionButtons = (id, hasPaid) =>
    bookingType === 'sitting_jobs' ? (
      <ConfirmedJob
        id={id}
        hasPaid={hasPaid}
        openModal={openModal}
        setModalContent={setModalContent}
        setActionType={setActionType}
        setBookingId={() => setBookingId(id)}
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
          return (
            <Item
              key={index} // data.id
              t={t}
              data={data}
              openModal={openModal}
              renderActionButtons={renderActionButtons}
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
          <LinkButton to="/find">Find a cat sitter</LinkButton> page to start looking for a cat sitter now!
        </span>
      )}
    </>
  );
}

export default Confirmed;

function ConfirmedJob({ hasPaid, openModal, setModalContent, setActionType, setBookingId }) {
  const { t } = useTranslation();
  console.log({ hasPaid })

  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <OutlinedButton
        backgroundColor="#9ACD32"
        onClick={() => {
          openModal();
          setModalContent(t('bookings.complete_confirm'));
          setActionType('complete');
          setBookingId();
        }}
      >
        {t('bookings.complete')}
      </OutlinedButton>
    </div>
  ) : (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span>waiting for cat owner to pay</span>
      </div>
    );
}

function ConfirmedService({ hasPaid, openModal, setModalContent }) {
  const { t } = useTranslation();

  console.log({ hasPaid___________: hasPaid })

  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>waiting for cat sitter to confirm completion of sitting appointment</span>
    </div>
  ) : (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LinkButton to={{ pathname: '/payment', state: { stripeAccountId: 'acct_1HYCiyART4JEToPd' } }}>
          {t('bookings.pay_now')}
        </LinkButton>
      </div>
    );
}

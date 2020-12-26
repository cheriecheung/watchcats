import React from 'react';
import ItemCard from '../components/ItemCard';
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
          const { id } = data || {}

          return (
            <ItemCard
              key={id}
              t={t}
              data={data}
              openModal={openModal}
              renderActionButtons={renderActionButtons}
              status="confirmed"
            />
          );
        })}

      {bookingType === 'sitting_jobs' && bookings.length === 0 && (
        <span>{t('bookings.no_jobs', { status: t('bookings.status_confirmed') })}</span>
      )}

      {bookingType === 'sitting_service' && bookings.length === 0 && (
        <>
          <span>
            {t('bookings.no_service', { status: t('bookings.status_confirmed') })}
          </span>

          <span>
            {t('bookings.go_to')}
            <LinkButton to="/find">{t('header.find_sitter')}</LinkButton>
            {t('bookings.find_sitter')}
          </span>
        </>
      )}
    </>
  );
}

export default Confirmed;

function ConfirmedJob({
  hasPaid,
  openModal,
  setModalContent,
  setActionType,
  setBookingId
}) {
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
        <span>{t('bookings.await_payment')}</span>
      </div>
    );
}

function ConfirmedService({ hasPaid, openModal, setModalContent }) {
  const { t } = useTranslation();

  console.log({ hasPaid___________: hasPaid })

  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>{t('bookings.await_completion')}</span>
    </div>
  ) : (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LinkButton to={{ pathname: '/payment', state: { stripeAccountId: 'acct_1HYCiyART4JEToPd' } }}>
          {t('bookings.pay_now')}
        </LinkButton>
      </div>
    );
}

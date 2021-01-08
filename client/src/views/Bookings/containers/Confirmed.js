import React from 'react';
import { LinkButton, OutlinedButton } from '../../../components/UIComponents';
import Icon from '../components/Icon';
import ItemCard from '../components/ItemCard';

function ConfirmedJob({ t, hasPaid, onCompleteBooking }) {

  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <OutlinedButton onClick={onCompleteBooking}>
        {t('bookings.complete')}
      </OutlinedButton>
    </div>
  ) : (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span>{t('bookings.await_payment')}</span>
      </div>
    );
}

function ConfirmedService({ t, hasPaid, bookingId }) {

  return hasPaid ? (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>{t('bookings.await_completion')}</span>
    </div>
  ) : (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LinkButton
          to={{ pathname: `/checkout?booking=${bookingId}` }}
          variant="bordered"
        >
          {t('bookings.pay_now')}
        </LinkButton>
      </div>
    );
}

function Confirmed({
  t,
  bookingType,
  bookings,
  onCompleteBooking
}) {
  const renderActionButtons = (id, hasPaid) =>
    bookingType === 'sitting_jobs' ? (
      <ConfirmedJob
        t={t}
        id={id}
        hasPaid={hasPaid}
        onCompleteBooking={() => onCompleteBooking(id)}
      />
    ) : (
        <ConfirmedService
          t={t}
          hasPaid={hasPaid}
          bookingId={id}
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
              bookingType={bookingType}
              data={data}
              renderActionButtons={renderActionButtons}
              status="confirmed"
            />
          );
        })}

      {bookingType === 'sitting_jobs' && bookings.length === 0 && (
        <>
          <Icon />
          <span>
            {t('bookings.no_jobs', { status: t('bookings.confirmed').toLowerCase() })}
          </span>
        </>
      )}

      {bookingType === 'sitting_service' && bookings.length === 0 && (
        <>
          <Icon />
          <span>
            {t('bookings.no_service', { status: t('bookings.confirmed').toLowerCase() })}
          </span>

          <span>
            {t('bookings.go_to')}
            <LinkButton to="/find" variant="colored">
              &nbsp;{t('header.find_sitter')}&nbsp;
            </LinkButton>
            {t('bookings.find_sitter')}
          </span>
        </>
      )}
    </>
  );
}

export default Confirmed;

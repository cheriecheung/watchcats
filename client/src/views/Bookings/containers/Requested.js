import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkButton, OutlinedButton, TextButton } from '../../../components/UIComponents';
import Icon from '../components/Icon';
import ItemCard from '../components/ItemCard';


function RequestedJob({ onHandleRequestedBooking }) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <TextButton
        style={{ marginRight: 10 }}
        onClick={() => onHandleRequestedBooking('decline')}
      >
        {t('bookings.decline')}
      </TextButton>

      <OutlinedButton
        style={{ marginRight: 0 }}
        onClick={() => onHandleRequestedBooking('accept')}
      >
        {t('bookings.accept')}
      </OutlinedButton>
    </div>
  );
}

function RequestedService() {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span>{t('bookings.await_acceptance')}</span>
    </div>
  );
}

function Requested({
  t,
  bookingType,
  bookings,
  onHandleRequestedBooking,
}) {
  console.log({ bookings })
  const renderSection = (id) =>
    bookingType === 'sitting_jobs' ? (
      <RequestedJob
        onHandleRequestedBooking={(actionType) => onHandleRequestedBooking(id, actionType)}
      />
    ) : (
        <RequestedService />
      );

  return (
    <>
      {Array.isArray(bookings) &&
        bookings.length > 0 &&
        bookings.map((data, index) => {
          const { id } = data || {}

          return (
            <ItemCard
              key={`${id}-${index}`}
              t={t}
              bookingType={bookingType}
              data={data}
              renderActionButtons={(id) => renderSection(id)}
              status='requested'
            />
          )
        })}

      {bookingType === 'sitting_jobs' &&
        Array.isArray(bookings) &&
        bookings.length === 0 && (
          <>
            <Icon />
            <span>
              {t('bookings.no_jobs', { status: t('bookings.requested').toLowerCase() })}
            </span>
            <span>{t('bookings.receive_sitting_jobs')}</span>
          </>
        )}

      {bookingType === 'sitting_service' &&
        Array.isArray(bookings) &&
        bookings.length === 0 && (
          <>
            <Icon />
            <span>
              {t('bookings.no_service', { status: t('bookings.requested').toLowerCase() })}
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

export default Requested;
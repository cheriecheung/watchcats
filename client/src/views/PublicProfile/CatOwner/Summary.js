import React from 'react';
import {
  DateDisplay,
  Image,
  ImageContainer,
  ProfileStats,
  TimeDisplay,
  VerticalCard
} from '../../../components/UIComponents'
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg'

const { REACT_APP_API_DOMAIN } = process.env;

function Summary({ t, ownerInfo }) {
  const {
    firstName,
    lastName,
    profilePicture,
    totalReviews,
    totalCompletedBookings,
    totalRepeatedCustomers,
    bookingOneDay = [],
    bookingOvernight = []
  } = ownerInfo

  const pictureUrl = profilePicture ? `${REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

  console.log({ bookingOneDay, bookingOvernight })

  return (
    <VerticalCard variant="profileSummary">
      <h4>{firstName} {lastName && lastName.charAt(0)}</h4>

      <ImageContainer>
        <Image url={pictureUrl} />
      </ImageContainer>

      <br />

      <ProfileStats
        type="owner"
        totalReviews={totalReviews}
        totalCompletedBookings={totalCompletedBookings}
        totalRepeatedCustomers={totalRepeatedCustomers}
      />

      <hr />

      {bookingOneDay.length === 0 &&
        bookingOvernight.length === 0 &&
        <span>No sitter needed currently</span>
      }

      {(bookingOneDay.length > 0 || bookingOvernight.length > 0) &&
        <>
          <h5>{t('owner_profile.sitter_needed')}:</h5>
          <AppointmentTime t={t} oneDay={bookingOneDay} overnight={bookingOvernight} />
        </>
      }
    </VerticalCard>
  );
}

export default Summary;

function AppointmentTime({ t, oneDay, overnight }) {
  return (
    <>
      {Array.isArray(oneDay) && oneDay.length > 0 && (
        <>
          <br />
          <h6>{t('owner_profile.one_day_appointment')}: </h6>

          {oneDay.map(({ id, date, endTime, startTime }) => (
            <span style={{ display: 'flex' }} key={id}>
              <DateDisplay date={date} />
              <TimeDisplay startTime={startTime} endTime={endTime} />
            </span>
          )
          )}
        </>
      )}

      {Array.isArray(overnight) && overnight.length > 0 && (
        <>
          <br />
          <h6>{t('owner_profile.overnight_appointment')}: </h6>

          {overnight.map(({ id, startDate, endDate }) => (
            <div style={{ display: 'flex' }}>
              <DateDisplay date={startDate} />

              <div style={{ width: 10, height: 4, background: 'grey', margin: '0 10px', alignSelf: 'center' }} />

              <DateDisplay date={endDate} />
            </div>
          ))}
        </>
      )}
    </>
  );
}

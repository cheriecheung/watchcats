import React from 'react';
import {
  DateDisplay,
  Image,
  ImageContainer,
  ProfileStats,
  VerticalCard
} from '../../../components/UIComponents'
import moment from 'moment';
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
    bookingOneDay,
    bookingOvernight
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
      {/* email verified */}
      {/* phone verified */}
      <h6>Verified</h6>

      {/* change logic */}
      {/* {(Array.isArray(bookingOneDay) && bookingOneDay.length > 0) ||
        Array.isArray(bookingOvernight) && bookingOvernight.length > 0 && */}
      <>
        <hr />
        <h5>{t('owner_profile.sitter_needed')}:</h5>
        <AppointmentTime t={t} oneDay={bookingOneDay} overnight={bookingOvernight} />
      </>
      {/* } */}
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

          {oneDay.map(({ id, date, endTime, startTime }) => {
            const dateConverted = moment(date).format('DD MMM YYYY');
            const startTimeObj = moment(startTime).format('HH:mm');
            const endTimeObj = moment(endTime).format('HH:mm');

            const dateSplit = dateConverted.split(" ");

            return (
              <span style={{ display: 'flex' }} key={id}>
                <DateDisplay splitString={dateSplit} />
                {startTimeObj} - {endTimeObj}
              </span>
            );
          })}
        </>
      )}

      {Array.isArray(overnight) && overnight.length > 0 && (
        <>
          <br />
          <h6>{t('owner_profile.overnight_appointment')}: </h6>

          {overnight.map(({ id, startDate, endDate }) => {
            const startDateConverted = moment(startDate, 'YYYY-MM-DD').format('DD MMM YYYY');
            const endDateConverted = moment(endDate, 'YYYY-MM-DD').format('DD MMM YYYY');

            const startDateSplit = startDateConverted.split(" ");
            const endDateSplit = endDateConverted.split(" ");

            return (
              <div style={{ display: 'flex' }}>
                <DateDisplay splitString={startDateSplit} />

                <div style={{ width: 10, height: 4, background: 'grey', margin: '0 10px', alignSelf: 'center' }} />

                <DateDisplay splitString={endDateSplit} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
